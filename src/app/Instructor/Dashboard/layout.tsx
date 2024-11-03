import Sidebar from "./SideBar/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
        <div>
    <div className="flex">
    {/* Sidebar */}
    <div className="w-64">
    <Sidebar  />
    </div>

    <div className=" p-3 flex-1">{children}</div>
    </div>
    </div>
    )
  
}
