import Link from "next/link";

function SidebarOption({ title, Icon, link }) {
    return (
        <Link href={link} passHref>
            <div className="sidebar-option">
                <span className="inline-flex justify-center items-center ml-4">
                    <Icon className="h-5 w-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{title}</span>
            </div>
        </Link>
    );
}

export default SidebarOption;
