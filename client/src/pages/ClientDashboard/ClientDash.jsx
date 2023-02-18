import React from "react";
import ClientSidebar from "../../components/ClientSidebar";

const ClientDash = ()=>{
    return(
        <div className="flex relative bg-gray-400">
        {/* Client Sidebar Implementation */}
        <div className="flex relative bg-main-bg">
            <ClientSidebar/>
        </div>
            
        </div>
    )
}

export default ClientDash;