import { useState } from "react";
import {Home,ShoppingCart,Package,Users,Star,DollarSign,MapPin,Truck,BarChart,Settings,FileText,ChevronDown,ChevronUp,Menu,X} from "lucide-react";
import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* === PANEL PEGABLE === */}
            <div className="flex items-center bg-gray-900 text-white p-3 md:hidden shadow-md">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-gray-800 rounded transition"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <span className="ml-3 font-semibold">Panel Administrador</span>
            </div>

            {/* === PANEL DE ESCRITORIO === */}
            <aside className="hidden md:flex md:flex-col bg-gray-900 text-white w-64 h-screen shadow-lg">
                <div className="flex items-center space-x-3 p-4 border-b border-gray-700">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Administrador</p>
                        <p className="text-xs text-gray-400">PERFIL: ADMINISTRADOR</p>
                    </div>
                </div>

                <nav className="flex-1 p-3 text-sm overflow-y-auto space-y-1">
                    <SidebarItem icon={<Home />} name="Inicio" />
                    <SidebarItem icon={<Package />} name="Catálogo" />
                    <SidebarDropdown
                        icon={<ShoppingCart />}
                        name="Ventas"
                        open={openMenu === "ventas"}
                        onToggle={() => toggleMenu("ventas")}
                        items={["Nueva Venta","Programar Venta","Listado de Ventas"]}
                    />
                    <SidebarDropdown
                        icon={<Truck />}
                        name="Compras"
                        open={openMenu === "compras"}
                        onToggle={() => toggleMenu("compras")}
                        items={["Nueva Compra","Listado de Compras"]}
                    />
                    <SidebarDropdown
                        icon={<DollarSign />}
                        name="Cobranzas"
                        open={openMenu === "cobranzas"}
                        onToggle={() => toggleMenu("cobranzas")}
                        items={["Listado de Cobranzas"]}
                    />
                    <SidebarDropdown
                        icon={<Star />}
                        name="Artículos"
                        open={openMenu === "articulos"}
                        onToggle={() => toggleMenu("articulos")}
                        items={["Nuevo Artículo","Listado de Artículos"]}
                    />
                    <SidebarDropdown
                        icon={<FileText />}
                        name="Productos"
                        open={openMenu === "productos"}
                        onToggle={() => toggleMenu("productos")}
                        items={["Nuevo Producto","Listado de Productos"]}
                    />
                    <SidebarDropdown
                        icon={<MapPin />}
                        name="Clientes"
                        open={openMenu === "clientes"}
                        onToggle={() => toggleMenu("clientes")}
                        items={["Nuevo Cliente","Listado de Clientes"]}
                    />
                    <SidebarDropdown
                        icon={<Truck />}
                        name="Proveedores"
                        open={openMenu === "proveedores"}
                        onToggle={() => toggleMenu("proveedores")}
                        items={["Nuevo Proveedor","Listado de Proveedores"]}
                    />
                    <SidebarDropdown
                        icon={<Users />}
                        name="Usuarios"
                        open={openMenu === "usuarios"}
                        onToggle={() => toggleMenu("usuarios")}
                        items={["Nuevo Usuario","Listado de Usuarios"]}
                    />
                    <SidebarDropdown
                        icon={<Settings />}
                        name="Mantenimiento"
                        open={openMenu === "mantenimiento"}
                        onToggle={() => toggleMenu("mantenimiento")}
                        items={["Categoría","Presentación","Tipo de Usuario","Tipo de Cliente","Zona","Tipo de documento","Tipo de Comprobante","Medio de Pago"]}
                    />
                    <SidebarDropdown
                        icon={<BarChart />}
                        name="Reportes"
                        open={openMenu === "reportes"}
                        onToggle={() => toggleMenu("reportes")}
                        items={["Ventas","Compras","Cobranzas","Caja"]}
                    />
                </nav>
            </aside>

            {/* === MENÚ DESPLEGABLE (MÓVIL) === */}
            {sidebarOpen && (
                <div className="md:hidden bg-gray-900 text-white shadow-lg animate-slideDown">
                    <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Administrador</p>
                            <p className="text-xs text-gray-400">PERFIL: ADMINISTRADOR</p>
                        </div>
                    </div>

                    <nav className="p-3 text-sm space-y-1">
                        <SidebarItem icon={<Home />} name="Inicio" />
                        <SidebarItem icon={<Package />} name="Catálogo" />
                        <SidebarDropdown
                            icon={<ShoppingCart />}
                            name="Ventas"
                            open={openMenu === "ventas"}
                            onToggle={() => toggleMenu("ventas")}
                            items={["Listado de Ventas", "Nueva Venta", "Programar Venta"]}
                        />
                        <SidebarDropdown
                            icon={<Truck />}
                            name="Compras"
                            open={openMenu === "compras"}
                            onToggle={() => toggleMenu("compras")}
                            items={["Nueva Compra","Listado de Compras"]}
                        />
                        <SidebarDropdown
                            icon={<FileText />}
                            name="Cobranzas"
                            open={openMenu === "cobranzas"}
                            onToggle={() => toggleMenu("cobranzas")}
                            items={["Listado de Cobranzas"]}
                        />
                        <SidebarDropdown
                            icon={<Star />}
                            name="Artículos"
                            open={openMenu === "articulos"}
                            onToggle={() => toggleMenu("articulos")}
                            items={["Nuevo Artículo","Listado de Artículos"]}
                        />
                        <SidebarDropdown
                            icon={<FileText />}
                            name="Productos"
                            open={openMenu === "productos"}
                            onToggle={() => toggleMenu("productos")}
                            items={["Nuevo Producto","Listado de Productos"]}
                        />
                        <SidebarDropdown
                            icon={<MapPin />}
                            name="Clientes"
                            open={openMenu === "clientes"}
                            onToggle={() => toggleMenu("clientes")}
                            items={["Nuevo Cliente","Listado de Clientes"]}
                        />
                        <SidebarDropdown
                            icon={<Truck />}
                            name="Proveedores"
                            open={openMenu === "proveedores"}
                            onToggle={() => toggleMenu("proveedores")}
                            items={["Nuevo Proveedor","Listado de Proveedores"]}
                        />
                        <SidebarDropdown
                            icon={<Users />}
                            name="Usuarios"
                            open={openMenu === "usuarios"}
                            onToggle={() => toggleMenu("usuarios")}
                            items={["Nuevo Usuario","Listado de Usuarios"]}
                        />
                        <SidebarDropdown
                            icon={<Settings />}
                            name="Mantenimiento"
                            open={openMenu === "mantenimiento"}
                            onToggle={() => toggleMenu("mantenimiento")}
                            items={["Categoría","Presentación","Tipo de Usuario","Tipo de Cliente","Zona","Tipo de documento","Tipo de Comprobante","Medio de Pago"]}
                        />
                        <SidebarDropdown
                            icon={<BarChart />}
                            name="Reportes"
                            open={openMenu === "reportes"}
                            onToggle={() => toggleMenu("reportes")}
                            items={["Ventas","Compras","Cobranzas","Caja"]}
                        />
                    </nav>
                </div>
            )}

            {/* === CONTENIDO PRINCIPAL === */}
            <main className="flex-1 p-4 md:p-6">
                <header className="bg-white border-b p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm rounded-md mb-6">
                    <h1 className="text-lg font-semibold mb-2 md:mb-0">
                        🛒 Ventas{" "}
                        <span className="text-red-600 font-bold">Local Presencial</span>
                    </h1>
                    <nav className="text-sm text-gray-500">
                        <a href="#" className="hover:text-blue-600 mx-1">
                            Listado de Ventas
                        </a>{" "}
                        |
                        <a href="#" className="hover:text-blue-600 mx-1">
                            Nueva Venta
                        </a>{" "}
                        |
                        <a href="#" className="hover:text-blue-600 mx-1">
                            Programar Venta
                        </a>
                    </nav>
                </header>

                {/* === CONTENIDO PRINCIPAL === */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <button className="text-green-600 text-sm hover:underline">
                            ⬇️ Exportar a Excel
                        </button>
                    </div>
                    {/* FILTROS */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                        <InputDate label="Desde:"/>
                        <InputDate label="Hasta:"/>
                        <Select label="Estado:" options={["TODOS NO PAGADO","TODOS","PENDIENTE","DESPACHADO","ENTREGADO","PAGADO","ANULADO"]}/>
                        <Select label="Tipo:" options={["TODOS","TIENDAS","DELIVERY"]}/>
                        <Select label="Repartidor:" options={["TODOS", "Administrador"]}/>
                        <Select label="Medio Pago:" options={["TODOS","EFECTIVO","TARJETA","APP","TRANSFERENCIA","CREDITO"]}/>
                    </div>

                    {/* DIRECCIÓN */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Dirección:</label>
                        <input
                            type="text"
                            className="border rounded-md w-full p-2 text-sm"
                            placeholder="Buscar dirección..."
                        />
                    </div>

                    {/* BOTÓN BUSCAR */}
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded mb-6">
                        🔍 Buscar
                    </button>

                    {/* TABLA */}
                    <div className="overflow-x-auto">
                        <table className="w-full border text-sm text-left">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Nro.</th>
                                <th className="p-2 border">Estado</th>
                                <th className="p-2 border">Fec. Vent.</th>
                                <th className="p-2 border">Med. Pago</th>
                                <th className="p-2 border">Cliente</th>
                                <th className="p-2 border">Tipo</th>
                                <th className="p-2 border">Plataforma</th>
                                <th className="p-2 border">Repartidor</th>
                                <th className="p-2 border">Dirección</th>
                                <th className="p-2 border">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan="11" className="text-center py-4 text-gray-500">
                                    No existen registros
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACIÓN */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Mostrar{" "}
                            <select className="border rounded-md p-1 text-sm">
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>{" "}
                            registros
                        </div>
                        <div className="flex space-x-2">
                            <button className="border px-3 py-1 rounded hover:bg-gray-100">
                                Primero
                            </button>
                            <button className="border px-3 py-1 rounded hover:bg-gray-100">
                                Anterior
                            </button>
                            <button className="border px-3 py-1 rounded hover:bg-gray-100">
                                Siguiente
                            </button>
                            <button className="border px-3 py-1 rounded hover:bg-gray-100">
                                Último
                            </button>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        Copyright © La Granja 2021 - 2025
                    </p>

                </div>
            </main>
        </div>
    );
}

/* === COMPONENTES === */
function SidebarItem({icon, name, active}) {
    return (
        <div
            className={`flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition ${
                active ? "bg-gray-800 text-yellow-300" : ""
            }`}
        >
            {icon && <span className="mr-3">{icon}</span>}
            <span>{name}</span>
        </div>
    );
}

function SidebarDropdown({icon, name, open, onToggle, items}) {
    return (
        <div>
            <div
                className="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition"
                onClick={onToggle}
            >
                <div className="flex items-center">
                    {icon && <span className="mr-3">{icon}</span>}
                    <span>{name}</span>
                </div>
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {open && (
                <div className="ml-10 space-y-1 text-gray-400 text-sm animate-slideDown">
                    {items.map((item, i) => (
                        <div key={i} className="cursor-pointer hover:text-white">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function InputDate({ label }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input type="date" className="border rounded-md w-full p-2 text-sm" />
        </div>
    );
}

function Select({ label, options }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <select className="border rounded-md w-full p-2 text-sm">
                {options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

export default App;
