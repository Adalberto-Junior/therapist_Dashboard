import * as React from "react"; 
import Box from "@mui/material/Box"; 
import Tab from "@mui/material/Tab"; 
import TabContext from "@mui/lab/TabContext"; 
import TabList from "@mui/lab/TabList"; 
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate } from "react-router-dom";


export default function UtenteTabs() { 
  const [value, setValue] = React.useState("1"); 
  const navigate = useNavigate();
  const index = 0

  const handleChange = (event, newValue) => {
    setValue(newValue);
    event.preventDefault(); // Prevent default behavior of the tab
    if (newValue === "1") {
        navigate("/");

    }   
    if (newValue === "2"){
        navigate("/utente");
    // navigate("/utente", { state: { index } }); // Pass the index as state to the next page
    } 
    if (newValue === "3") {
        navigate("/register");
    }
  };
  
  // const handleChange = (event, newValue) => { 
  //   setValue(newValue); 
  // }; 
  
  return ( 
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        // width: "100vw",
        position: "absolute",
        top: 0,
        left: 10,
        // padding: 1,
      }}
    > 
      <br /> 
      <div 
        style={{ 
          margin: "auto", 
          display: "flex", 
          justifyContent: "space-evenly", 
        //   height: "100vh",
        }} 
      > 
        <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <TabList onChange={handleChange} sx={{ width: "100%" }}>
                <Tab label="Home" value="1" sx={{ flexGrow: 1 }} />
                <Tab label="Utente" value="2" sx={{ flexGrow: 1 }} />
                <Tab label="Perfil" value="3" sx={{ flexGrow: 1 }} />
            </TabList>
            </Box>
        </TabContext>
        </Box>
        {/* <Box sx={{width: "100%", typography: "body1" }}> 
          <TabContext value={value}> 
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}> 
              <TabList onChange={handleChange}> 
                <Tab label="Home" value="1" /> 
                <Tab label="Utente" value="2" /> 
                <Tab label="Perfil" value="3" /> 
              </TabList> 
            </Box> 
          </TabContext> 
        </Box>  */}
      </div> 
    </div> 
  ); 
}