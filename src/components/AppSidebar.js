import SidebarItem from "./SidebarItem";
import items from "../_nav.json";
import './AppComponent.css';
import { useSelector } from "react-redux";

export default function Sidebar() {

  const sidebar = useSelector((state) => state.sidebar);
  if (!sidebar.active) {
    var hide = { display: 'none' }
  }


  return (
    <div className={sidebar.active ? "sidebar" : 'sidebar-hide'}>
      <div className="sidebar-header">
        <img alt='' src='' />
        <div style={hide}><strong>Bookmark</strong></div>
      </div>
      <div style={hide}>
        {items.map((item, index) => <SidebarItem key={index} item={item} />)}
      </div>
    </div>
  )
}