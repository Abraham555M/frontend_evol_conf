class VentasService {
  constructor() {
    this.baseURL = "/api/ventas";
  }

  // Obtener token del localStorage (si usas autenticación JWT)
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Buscar ventas con filtros
  async buscarPorFiltros(filtros) {
    try {
      const params = new URLSearchParams();

      params.append('desde', filtros.desde);
      params.append('hasta', filtros.hasta);

      if (filtros.estado !== undefined && filtros.estado !== null && filtros.estado !== '') {
        params.append('estado', filtros.estado);
      }

      if (filtros.idPagoMedio !== undefined && filtros.idPagoMedio !== null && filtros.idPagoMedio !== '') {
        params.append('idPagoMedio', filtros.idPagoMedio);
      }

      const response = await fetch(`${this.baseURL}/filtros?${params.toString()}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al buscar ventas:', error);
      throw error;
    }
  }

  // Obtener venta por ID
  async obtenerPorId(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener venta:', error);
      throw error;
    }
  }

  // Anular venta
  async anular(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al anular venta:', error);
      throw error;
    }
  }

  // Cambiar estado de venta
  async cambiarEstado(id, nuevoEstado) {
    try {
      const response = await fetch(`${this.baseURL}/${id}/estado?nuevoEstado=${nuevoEstado}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      throw error;
    }
  }

  // Exportar a Excel
  async exportarExcel(filtros) {
    try {
      const params = new URLSearchParams();

      params.append('desde', filtros.desde);
      params.append('hasta', filtros.hasta);

      if (filtros.estado !== undefined && filtros.estado !== null && filtros.estado !== '') {
        params.append('estado', filtros.estado);
      }

      if (filtros.idPagoMedio !== undefined && filtros.idPagoMedio !== null && filtros.idPagoMedio !== '') {
        params.append('idPagoMedio', filtros.idPagoMedio);
      }

      const response = await fetch(`${this.baseURL}/export/excel?${params.toString()}`, {
        method: 'GET',
        headers: {
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        }
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error al exportar Excel:', error);
      throw error;
    }
  }

  // Obtener ventas por cliente
  async obtenerPorCliente(idCliente) {
    try {
      const response = await fetch(`${this.baseURL}/cliente/${idCliente}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener ventas por cliente:', error);
      throw error;
    }
  }
}

// Exportar instancia única (Singleton)
const ventasService = new VentasService();
export default ventasService;