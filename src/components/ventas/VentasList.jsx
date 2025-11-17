// src/components/ventas/VentasList.jsx

import { useState, useEffect } from 'react';
import ventasService from '../../services/ventasService';
import './VentasList.css';

const VentasList = () => {
  // Estado para las ventas
  const [ventas, setVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estado para filtros
  const [filtros, setFiltros] = useState({
    desde: getDefaultDesde(),
    hasta: getDefaultHasta(),
    estado: '',
    idPagoMedio: '',
    tipo: '',
    repartidor: '',
    direccion: ''
  });

  // Estado para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(20);

  // Cargar ventas al montar el componente
  useEffect(() => {
    buscarVentas();
  }, []);

  // Aplicar filtros locales cuando cambian las ventas o filtros
  useEffect(() => {
    aplicarFiltrosLocales();
  }, [ventas, filtros.tipo, filtros.repartidor, filtros.direccion]);

  // Funciones para fechas por defecto
  function getDefaultDesde() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - 30);
    return fecha.toISOString().split('T')[0];
  }

  function getDefaultHasta() {
    return new Date().toISOString().split('T')[0];
  }

  // Buscar ventas en el backend
  const buscarVentas = async () => {
    setLoading(true);
    try {
      const response = await ventasService.buscarPorFiltros({
        desde: filtros.desde,
        hasta: filtros.hasta,
        estado: filtros.estado,
        idPagoMedio: filtros.idPagoMedio
      });

      if (response.success) {
        setVentas(response.data || []);
      } else {
        console.error('Error en respuesta:', response.message);
        alert('Error al cargar ventas: ' + response.message);
      }
    } catch (error) {
      console.error('Error al buscar ventas:', error);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros locales (tipo, repartidor, dirección)
  const aplicarFiltrosLocales = () => {
    let resultado = [...ventas];

    if (filtros.tipo) {
      resultado = resultado.filter(v => 
        v.plataforma?.toUpperCase() === filtros.tipo.toUpperCase()
      );
    }

    if (filtros.repartidor) {
      resultado = resultado.filter(v => 
        v.repartidor?.toLowerCase().includes(filtros.repartidor.toLowerCase())
      );
    }

    if (filtros.direccion) {
      resultado = resultado.filter(v => 
        v.dirVenta?.toLowerCase().includes(filtros.direccion.toLowerCase())
      );
    }

    setVentasFiltradas(resultado);
    setPaginaActual(1);
  };

  // Manejar cambios en filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      desde: getDefaultDesde(),
      hasta: getDefaultHasta(),
      estado: '',
      idPagoMedio: '',
      tipo: '',
      repartidor: '',
      direccion: ''
    });
  };

  // Exportar a Excel
  const exportarExcel = async () => {
    setLoading(true);
    try {
      const blob = await ventasService.exportarExcel({
        desde: filtros.desde,
        hasta: filtros.hasta,
        estado: filtros.estado,
        idPagoMedio: filtros.idPagoMedio
      });

      // Crear enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ventas_${new Date().getTime()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al exportar a Excel');
    } finally {
      setLoading(false);
    }
  };

  // Obtener clase CSS según estado
  const getEstadoClass = (estadoTexto) => {
    const estado = estadoTexto?.toUpperCase() || '';
    if (estado.includes('ANULADO')) return 'estado-anulado';
    if (estado.includes('ENTREGADO')) return 'estado-entregado';
    if (estado.includes('PENDIENTE')) return 'estado-pendiente';
    if (estado.includes('DESPACHADO')) return 'estado-despachado';
    return '';
  };

  // Paginación
  const totalPaginas = Math.ceil(ventasFiltradas.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const ventasPaginadas = ventasFiltradas.slice(indiceInicio, indiceFin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="ventas-container">
      {/* HEADER */}
      <div className="header">
        <h1>
          <span className="icon-cart">🛒</span>
          Ventas <span className="highlight">Local Presencial</span>
        </h1>
        <div className="header-actions">
          <a href="#" className="link">Listado de Ventas</a>
          <span className="separator">|</span>
          <a href="#" className="link">Nueva Venta</a>
          <span className="separator">|</span>
          <a href="#" className="link">Programar Venta</a>
        </div>
      </div>

      {/* BOTÓN EXPORTAR */}
      <div className="export-section">
        <button className="btn-export" onClick={exportarExcel} disabled={loading}>
          <span className="icon-download">📥</span>
          Exportar a Excel
        </button>
      </div>

      {/* FILTROS */}
      <div className="filters-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Desde:</label>
            <input
              type="date"
              name="desde"
              value={filtros.desde}
              onChange={handleFiltroChange}
              className="form-control"
            />
          </div>

          <div className="filter-group">
            <label>Hasta:</label>
            <input
              type="date"
              name="hasta"
              value={filtros.hasta}
              onChange={handleFiltroChange}
              className="form-control"
            />
          </div>

          <div className="filter-group">
            <label>Estado:</label>
            <select
              name="estado"
              value={filtros.estado}
              onChange={handleFiltroChange}
              className="form-control"
            >
              <option value="">TODOS NO PAGADO</option>
              <option value="1">PENDIENTE</option>
              <option value="2">ENTREGADO</option>
              <option value="3">DESPACHADO</option>
              <option value="0">ANULADO</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tipo:</label>
            <select
              name="tipo"
              value={filtros.tipo}
              onChange={handleFiltroChange}
              className="form-control"
            >
              <option value="">TODOS</option>
              <option value="DELIVERY">DELIVERY</option>
              <option value="RECOJO">RECOJO</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Repartidor:</label>
            <select
              name="repartidor"
              value={filtros.repartidor}
              onChange={handleFiltroChange}
              className="form-control"
            >
              <option value="">TODOS</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Medio Pago:</label>
            <select
              name="idPagoMedio"
              value={filtros.idPagoMedio}
              onChange={handleFiltroChange}
              className="form-control"
            >
              <option value="">TODOS</option>
              <option value="1">EFECTIVO</option>
              <option value="2">TARJETA</option>
              <option value="3">CREDITO</option>
              <option value="4">APP</option>
            </select>
          </div>

          <div className="filter-group full-width">
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={filtros.direccion}
              onChange={handleFiltroChange}
              className="form-control"
              placeholder="Buscar por dirección..."
            />
          </div>
        </div>

        <div className="filter-actions">
          <button className="btn-search" onClick={buscarVentas} disabled={loading}>
            <span className="icon-search">🔍</span>
            Buscar
          </button>
          <button className="btn-clear" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </div>

      {/* BARRA DE PAGINACIÓN */}
      <div className="search-bar">
        <label>Buscar:</label>
        <input type="text" className="search-input" placeholder="Buscar en resultados..." />
        <div className="pagination-info">
          Mostrar
          <select
            value={registrosPorPagina}
            onChange={(e) => {
              setRegistrosPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            className="page-size-select"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          registros
        </div>
      </div>

      {/* TABLA */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando ventas...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="ventas-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nro.</th>
                <th>Estado</th>
                <th>Fec.Vent.</th>
                <th>Med.Pago</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Plataforma</th>
                <th>Repartidor</th>
                <th>Dirección</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventasPaginadas.length > 0 ? (
                ventasPaginadas.map((venta, index) => (
                  <tr key={venta.idVenta}>
                    <td>{indiceInicio + index + 1}</td>
                    <td>{venta.numVenta}</td>
                    <td>
                      <span className={`estado-badge ${getEstadoClass(venta.estadoTexto)}`}>
                        {venta.estadoTexto || 'N/A'}
                      </span>
                    </td>
                    <td>{venta.fecVenta}</td>
                    <td>{venta.nombrePagoMedio}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.plataforma || 'DELIVERY'}</td>
                    <td>{venta.plataforma || 'APP'}</td>
                    <td>{venta.repartidor || '-'}</td>
                    <td>{venta.dirVenta || '-'}</td>
                    <td className="total">S/{venta.totVenta?.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="no-data">
                    No se encontraron ventas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINACIÓN */}
      {!loading && ventasFiltradas.length > 0 && (
        <div className="pagination">
          <button
            className="btn-page"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
          <span className="page-info">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            className="btn-page"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default VentasList;