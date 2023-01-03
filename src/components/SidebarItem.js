import { useState } from "react"
import { Link } from "react-router-dom"

export default function SidebarItem({ item }) {

  const [open, setOpen] = useState(false)

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item plain"}>
        <div className="sidebar-title" onClick={() => setOpen(!open)}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => <SidebarItem key={index} item={child} />)}
        </div>
      </div>
    )
  } else {
    return (
      <nav>
        <Link to={item.path || "#"} className="sidebar-item plain">
          {item.icon && <i className={item.icon}></i>}
          {item.title}</Link>
      </nav>
    )
  }
}