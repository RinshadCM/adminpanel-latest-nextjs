import SidebarOption from "./SidebarOption"
import {AiOutlineHome} from "react-icons/ai"
function Sidebar() {
  return (
    <div className="bg-white border-r-2 min-h-screen w-[260px] fixed top-0 left-0 hidden md:inline-flex font-inter">
      <div>
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <li>
            <SidebarOption title={"Dashboard"} Icon={AiOutlineHome} link="/dashboard" />
          </li>
          <li>
            <SidebarOption title={"Users"} Icon={AiOutlineHome} link="/dashboard/companies" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar