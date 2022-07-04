/**
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `data` key is used to store the data of its route.
*/

// Material Dashboard 2 React layouts
import AllRecord from "layouts/filer-record-download";
import FilterCSVSDownload from "layouts/filer-files-download";
import FileUpload from "layouts/upload/index";
import Register from "layouts/registertion";
import User from "layouts/user";
import Reset from "layouts/reset";
// @mui icons
import Icon from "@mui/material/Icon";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const routes = [
  {
    type: "collapse",
    name: "Records",
    key: "all record",
    role: ["Admin", "User"],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/all-record",
    component: <AllRecord />,
  },
  {
    type: "collapse",
    name: "Files",
    key: "all-files",
    role: ["Admin", "User"],
    icon: <AttachFileIcon fontSize="small" />,
    route: "/all-files",
    component: <FilterCSVSDownload />,
  },
  {
    type: "collapse",
    name: "Upload",
    key: "file-upload",
    role: ["Admin", "User"],
    icon: <UploadFileIcon fontSize="small" />,
    route: "/file-upload",
    component: <FileUpload />,
  },
  {
    type: "collapse",
    name: "User",
    key: "user",
    role: ["Admin", "User"],
    icon: <GroupIcon fontSize="small" />,
    route: "/user",
    component: <User />,
  },
  {
    type: "collapse",
    name: "Register",
    key: "register",
    role: ["Admin"],
    icon: <PersonAddAltIcon fontSize="small" />,
    route: "/register",
    component: <Register />,
  },
  {
    type: "collapse",
    name: "Reset",
    key: "reset",
    role: ["Admin", "User"],
    icon: <RestartAltIcon fontSize="small" />,
    route: "/reset",
    component: <Reset />,
  },
];

export default routes;
