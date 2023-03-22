import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { BarraMenu } from "./BarraMenu";
import { useNavigate } from "react-router-dom";
import { CerrarSesionUsu } from "../../helpers/ApiUsuarios";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const ref = useRef(null);
  const [menu, setMenu] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const navigate = useNavigate();
  const handle = () => {
    setMenu(false);
    setMenuUser(false);
  };
  useOnClickOutside(ref, handle);

  const CerrarSesion = () =>{
    CerrarSesionUsu().then((res)=>{
        res.statusCode === 200 && navigate("/login", {replace:true})
    })
  }

  const location = useLocation();

  const modules = {
    "/dashboard/anfitrion": "Abordaje",
    "/dashboard/recepcion": "Recepción",
    "/dashboard/almacen": "Almacén",
    "/dashboard/asignacion": "Asignación",
    "/dashboard/asignacion/servicios": "Asignación",
  }

  return (
    <div className="bg-white w-full shadow-md" ref={ref}>
      <div className="mx-auto container px-2 lg:px-8 min-w-full">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex justify-between gap-4 ">
            <div className="ml-3 flex items-center md:!flex lg:!hidden xl:!hidden">
              {/*Hamburguesa */}

              <label
                onClick={() => setMenu(!menu)}
                className="flex flex-col justify-center rounded-md p-2 bg-gray-400 text-white hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <div className="h-0.5 w-4 bg-white transition"></div>
                <div className="h-0.5 w-5 bg-white transition mt-1"></div>
                <div className="h-0.5 w-4 bg-white transition mt-1"></div>
              </label>
              <div
                className={`z-999 bg-redDerco h-screen shadow-lg absolute top-full translate-x-[-150%] transition ${
                  menu && "translate-x-[-8%]"
                } w-64`}
              >
                <BarraMenu />
              </div>
            </div>

            {/* LOGO DERCO TOPBAR */}
            <div className="lg:hidden flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-12 w-auto lg:hidden"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA0lBMVEX/DBf/////AADa2tr09PTo6Oj/AA7U1NTv7+/Q0NDy8vL26On/Qknr6+v/AAnLy8v4urv0+PjQ2Njzc3f/+Pjf39//9vb/zc//ISr/x8j/7O3/qav/UlfDw8P/sbT/KzLzbHH/29z/5eb/enz/iI3/Zmr/Ex3/1db/mZv/O0H/trn/MDf/lZj/pKf/TFH/cXb/XWD/gYX/bHDwi47u+vrlycrtsbL/jpH/YWX/WFzx2dro4uLzrrDXycnwwcPdw8TltLXtoKLzl5vr29zY5ubow8RASl7wAAAQZ0lEQVR4nO1dC3uiShKly9h5jDI4VxHQ1QsqiESMTrKaee3MJPP//9JWP8AXoLmTKLPb57vfHYGm6dNVXdVdXRBNU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQKDfgILIKnrXJLwMsjANY6qwcpZONcz2dnrvhxwL+um8cwL2BEqP+p61zD3+KFGn4uXV1UQzSrFENes/VjXPV5+kfQhG+VKvVXG4MN61KZaHrj1hu3RVXrern2h+hp/odNrxaLyBYvby+/hpR+MYK3qRnEf/+I4QIv6pbLd9FHfldf/gIsKhudkWdH93p527+YcBctPWCZOKicn19eXn5H4vCZ8FQXuAH1U9/gBBlw6vZBEmV8bv8sAAYb/fEjeA7LD3F3YbvoHHJCX6n1Krzgldr7hyfy66mtF/d0r09EQqGNR16V3VEtbHWX3Hjz5ILEb4IETayCV4Igl9AjznB+s3GxStBMSy1x4CVIHiVTZBUOMPLPtV/CYbbAuYMv5VaiPqvepGZuRIiRE8xuOLYHq1SiIsSUzzgKYiQIHoK+iQY7lwXDB9KrKY7Lm4XdU7weQZw28gQYWps5qUVIkyPECHzFP49J3izV0LcX/dLKkUaFZuZtacwGlk6uhZip6RCPM5T/ADoNm4YskRdao+hP4rm7eueQOuyUqlcVvqUtgXDbEFzhkYphUgf6tV6gaeoMDBPMbvPFSGfnmI196MSUoShmIblmRlOsPKABY2GWOZng08E6p/8c/PZA7WeeNPyzEydE2yhN4d/tzhyCl6IapalEyJMxTSsWITf0YLooxb/nec1RT3vrJIZG2rdF4qwykk9x2xtpH8XdHOKNkRFvZIJEeyMmfSG6gkdFSsjGgkh5tokXtN9uTwGrLgPz9VRQamVlP4pjvNKiznrt1Kthf0gcyad4EYQ/JgqnlDTfGPD6mqUaY0B8+yZdCpCjqdU7WAphJjXI6K7SuQxaP9doQjrFc5wQybwUGhsLnht9+XxGNARIsyZkBJBcDPaq68OGBuOd1FJjA0Nbwp1tCqUNN60HOj2OcWcTpE99qUkQgT7pkhHLzi/5x9braW1SqEQhZ424lLYU7i7P0aEO6ta+PnhsMe4aZdCiP6nYk8hRLgXmYCnYo8hjE0ZPAYsj/EU+5uf8Fexx+Caf1MCj0GjdzfZMRepbYLhbF8W0mPkCVH02/3t2YUIPb5gz/UUgmBWlBdGxR7j5opV/O7c01Ma3xQs2BMzk723e8BjEF5xY3JmIUJRzCX1FNm7LYnHyDU2ovMez+oxYFQUc5EirD71szUNfj4XegwhxOC8QvzUKCIoRZi360mtAx6DUzyrx4ClEGHeSKq2WGzwKbeFMHgu9Bic4sWnU1LaBvMURSK84gSro/yBdGCNIcb4/fhsQpSeIs/MNMR2cNF+oH53YHrKO/BsHkN/lBklOc0TMf7PhbPnxGPkjmSGs3kM9BRFBBvH7LIc9BgC50mzoZEgmGtmOJ4OxD3hY7HHuDij24dZ8VYTv7i/ptiFVTw9FTjPKoqGhQomRHg4oRJmRR5DqMm5rCn8KLASMsXpiD0k+FXgMSrvrxFfz2RMaXSZL8TjM0f0bv4a44rxY2l+b88mEzDMVTDpKY7KF4UvubqQJG+8OZU8+HkKJszM1XE5v/kDWu78n3FiCiMpxN0cUr7fXX86Mt6ZeIzdyVGa5vfGNIogN8r+tQfG8P7YvBia4zFaSfLG25IoblvIev/6/R4q9Xo9OLrvYZE1oNM0v7dkcLhtzGPsE3z/vlq/f8HinMpN08a+CC9zls+nArW+ti6vM1C5eknGiF573vMYInmjdTZPkQAWX68vM3D97UV9n+ExhFQfzucp0rbpcTcDIbxIuWi06zFE8sZzRqD19KAIfe/VLfoSsIDItrFpCMJn9RSboBDWfgMh1TV/O6DBkzdaz2f1FBugof3utxB0ARabaTYiStf6UQYdZYBv942Ct4AOolGv4kJ5M81GbsmVJW2IPlbyXwI6BjjJM2DTY8gtubN7igTIEBv2GwzZJPYO4Ee6aSq35EoiQU0uYltFr6sdEmG1+gtnD4nHEFty1TJsj0rI1IrWP1TVJH8dPsq1sCD4rTwiPBz2LEY9jco9bDCslyNNQYL2W0dEzPKQ5q+D0AURxCrZK7N5i9jjIBbM9VDXuS4IhmXSUQa9MLR4CCL1mXmMlGF5Ur4kYF6cWlEMkfp8/yg8BiP4qUyDUKAw7HmcEK8CnOC2OMMyvt6lP1Zyw55HCFHklgyB6UJZX7goCHseAZFX9RRR+vChWq+WylMkOLCPcQAyG7EDNPryyeiWkeDhjbJiCD29qlGKy+dyEjyYjHcAIuehHNmIeYC/i98VOSBEkZawKjfFXxlhz5dRbLjnz0YswKHUimLI3JJSRNdy8Xseg3+Hh5T1BVIBGv6GsZFef1Bqhr+1xqjw7YCvZYk+5cE/JrUiE+Jd9g/lfVVdItkoe7nH4F+UqHwtO8G1x3ipsRFvKLZWZZ3OrKF3K/9IiCKA+L38IkzTbLK23IrAX44qTvMrC4THuMzaGC7C9f6rQ6UF3yh7KcH37yuH0/xKA+uhkrnzfQDHJ2+cHWhsPvwDPH/5EwahAIR/7+Cvw/i7jF+KyAXVt3H4e6YlXtgrKCgoKCj8X2IrHe3Ft+TchVOEzAvpXOGE3/q2NuCLFqSTkZy0PGsbPt36ADs7ssLuY1yzdiY2APRxPu4gpssRXjwNSWo3N2Capmfcjnz5cIed2EbT6YLR3IZpur2BBZJfNLfNZpMQdqE9XunpB+m1md1cxwCa7rJ/komr3s6IQHhj3l6aFZ1oPoKddd7jE23dHzvb592BUFdYubu3OMPjB8YrM8T2xuwr8s2MK3kMCenqGu3v0SDE5gQHWbec4h22HIaERDSbIcll2NYpOFkXbNBgti42mdhpsRNQTBi6URSF3blhJs8O0KZIhsZGOm1c81OG8z7eEw9deehE0Et+zjSqhdOkh2KIEk5Tn5vSWfKct89gSBnK3OcwFdAdJAx7WynQWsLQFKeh78k7wighWOPDONXMJYzlr1tpw2Al63ZPxzA51hOKxgbDrVtShtJMgKzC7N/KW+UL+zR2hP29BdkJXlpTKu43f1Fvl6Gmh0nvpuOws/2HR7YZovuTahpAIH40k1bT5KY4rSl9zGq7N07IMBWJE+qyXe3ZYA1rQ0uZR+/PgkQalpRUsLvtm6rreqeNhk6iKqdn2JGSiCHLlsY0tTRCBWXpdg2SRtt73x9ayjvWLxbRpDv2Cp+AYTKaupkMazTDW3i3Mc40a2Yew6TKeD3oEobttw5YZTAcHyvDDTTbaHrzGSYy3MgcShmeQYaGOGPWknFouq7rJdiQYbO52QWrAi2dyzLrT2rQKK/wmzNMB4hn6am3WEdKqbbtD/1Z4su91DEGae3ShUJiONdJpjQxr2+eOrzHEIayNcFBfyjc+l0iyDBxG6m38PsCviX1d204U7G++QckdhhSWCQNXh7FEA+TKc0AJvJX6vGFcjvLVLFDSJ4je8N8Y35rhp74g2JR0kjStNJ56WT7JbZdhsktk1QZzYhNzvRUTsP0itdHF8qW2XKwnyDbJl1beIZhBxuWA51zurYweoiOwDTcZZiqtUbdhOLcB/+xk9TVp+kkjUyGo9Fgmky8ndOtLXYxzVsfrldPCcNRQiuEu7RU01zfjHKifuZznBMknmYz9Pje5oEVsJmMtqTYSk9d+yZ6vJRm7F9x41OsgIP9B9uoY7xVWeRRhrJTmpJhunqaspXu7hrYXSQBnNFOZzpzeooNODrsbGA6nq+ideCst4GJRC+EuSws20eX8m5mQgEWEy/lYE/jdRQOwJr32p7TbJpee3JbO9UfSNzb16T514QtTU/vFZNHumaFcVyL2Oppa/XHE6KT14z/kCSGHLwswKygoPA/CT2xfIkJpKCLfxKLSMU/6UFqOfVkr2WzgLbez5H/Squ7rkmX5dOvNWj8v6Rm+rquQx+xaeYMjd2EObpbDUI7sGdAQzycMg9N48lcZ1NO9tkxGrHic43yWydiFQtT9kVgOuaxJRgHgd3lv+Y9FouxpnjLbaSziFOH1aHfTYZsadmLRxPuXqfWeA5T/rPDHjFZvqb3hzFxA5ct1ogXBG5Pj4nbcXGufYfHHosr4NTf89k6yeN08bQrgocQyJgndEhM9RVh7xrQNpl0PB6igCZba9E+cYKA7wzgPI4tF9n0nB2RwcANHBIERt8zwA4QJqE8zPGaf/YKxri8YU3UyYKpF9hNAN9pI0M8XpIuWN4UryYMa0gearzpPumIGC4NcZIGBruuPyJP8FmP6SNnQrCYhatLiNgd4Bq4PESGjoMTcGA14eOZznoTNjTANw1WqkdeM80PHxFSmJEVcBGgYLCh9PYWGc5AZ3xGxG+yBq0Z4u+AicKJTfHBajBM6PNmoXy4wuKkDTpuFyfgyBALgWNjtSQOAsbQHJoRBV7TmC97Pb4rA4YTUVozR+3XDEnhI3AhOsUnShmOyZB1p85lOCIj6HgwQTXdYihO2BCIDwGzwrcO+ywPKiIy4aYEnKnm9UDIsE/YC5ZNbUjwxmET2Lldhrg0HnD+dNx8xb+cgIzsic22NEl7YhgoxzYJ0FBgozuDsYkq60xhQB71bYYOrvpRaEsiOlt3bYeHkfiZWhyHFMdfjEJBhk13YnhcC2zU7zkwhh1H32fI5IxK1IaQvOLrQ8iwbbtNfBhx2+2APXTgkAmToeN4RgSr5h1ew3G2wxAWxMfhJcIweED4l5UYQ8thcUGYOhqqeg2spme38QQKcw7UtTnDWnO+yxCNARoYLIXD03lFNRWWxvV0ysYdLiaAgj8lYzYONR8Ppk4c9l0PdrUULUsY1jwZpvYdETrjWmpZTBquHYU1XNNzLZ3hUnJBamE0wX5BhswubTNEHeUDed4cYSnz9dRUWJopDiKhGdbwkVIIXG5pNB49cxxcxnW3GBoutbwmvyA+iuULWyEsDQXPRk0z8TpxfWZpuPwMVpOJ1SJDvUvibYa+FwhrI0q93htSgiH+T3gL6JsdFkHzJEMakdvVaDRAoeI5YI4ClUhDid2ROb8gRkzCUB+REDjDIbkbjVboaLgt9cmt70zwhpVpM4YatI1thlNUaAbCSo3M19uGEgxv0e+R6Ww2W0GbrKw5ei/BENCsMVfleWA7i9lsFJPObOmiEUFfxxKE5V6D74kmoV0JIn+Fw84NWKjQIlONMdSw4aioeGZiWpzhIw/hoRVn2294N7FH+PzFCIliKYO8FkE0DW5E9YWz0JlSObYWuSw6o+ldh03JdEN4qqVj9dj1oIv/89pofAJhOzsuHzF+WwY7YeWw/JhF5HEbBO22z37R9mTMN7FhYT4OmL5D28EuxMczhni3x6p3vEnb56WwQa9F0eqz//d9jcfcLZxxoq1Hi+P3+d5mX3w1zo98ixdgxSw2oxaX2QVtoxw2zsL7NUjOY/X8kmX15QsXfd/viyv++vEWlUH/pJ7otb9WR2W0gf+W/2QVSK9uXtiti5egeSVo9vmdxDgV9lBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAoG/4L7SC9vf62LTkAAAAASUVORK5CYII="
                  alt="Derco Center"
                />
              </div>
            </div>

            <div>
              <p className="hidden lg:block font-bold text-3xl">
                <span>{location.pathname === "/dashboard" ? '' : "Módulo |"}</span> <span className="font-normal">{modules[location.pathname]}</span>
              </p>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/*ver notificaciones*/}
            <button
              type="button"
              className="relative rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-blue-800"
            >
              <div className="absolute w-2 h-2 bg-blue-600 top-0 left-3/4 rounded-full"></div>
              <i className="fa-regular fa-bell"></i>
            </button>

            {/* PERFIL HAMBURGUESA */}

            <div className="relative ml-3">
              <div>
                <label
                  onClick={() => setMenuUser(!menuUser)}
                  className="flex p-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 gap-3 items-center hover:bg-slate-500 cursor-pointer"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="hidden lg:block">
                    <h2 className="font-medium">Juan Perez</h2>
                    <p className="p-0 m-0">Admin</p>
                  </div>
                </label>
                <div
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden ${
                    menuUser && "!block"
                  }`}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:text-gray-500"
                  >
                    <i className="fa-solid fa-gear fx-1 mr-2"></i>Cambiar
                    Contraseña
                  </a>
                  <button
                    onClick={() => CerrarSesion()}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:text-gray-500"
                  >
                    <i className="fa-solid fa-right-from-bracket fa-1x mr-2"></i>
                    Cerrar Sesion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
