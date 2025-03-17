import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import '../App.css';
import { useNavigate } from 'react-router-dom';

function View() {
const [data,setdata] = useState([])
const [Title,setTitle] = useState("")
const [Description,setDescription] = useState("")
const [Weight,setWeight] = useState("")
const [Manufacture,setManufacture] = useState("")
const [Barcode_Number,setBarcode_Number] = useState("")
const [Data_Sheet,setData_Sheet] = useState("")
const [Product_Image,setProduct_Image] = useState("")
const [SelectedId,setSelectedId] = useState("")

const navigate = useNavigate();

const getdata =async() =>{
  fetch(`https://meddesknode-f0djang2hcfub6dc.eastus2-01.azurewebsites.net/api/getproducts`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => {
 if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response?.status} ${response?.statusText}`
      );
    }

    return response.json();
  })
  .then((res) => {
    console.log(res);
    if(res?.message === undefined || res?.message === "undefined" ||
    res?.message === null || res?.message === "null"){
        setdata(res)
    }else{
       
    }
  
  });
}

useEffect(()=>{
    getdata()
  const interval =   setInterval(() => {
        getdata()
    }, 5000);
    return(()=>{
        clearInterval(interval)
    })
})

const deleteid = async(id) =>{
console.log(id)
fetch(`https://meddesknode-f0djang2hcfub6dc.eastus2-01.azurewebsites.net/api/deleteproduct`,
{
  method: "POST",
  headers: {
    Accept: "application/json",
    "User-Agent": "*",
    "Content-Type": "application/json",
  },
body: JSON.stringify({
id:id,
}),
}
)
.then((response) => {
if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response?.status} ${response?.statusText}`
    );
  }

  return response.json();
})
.then((res) => {
  console.log(res);
});
}


 const updateitem = async() =>{
    console.log(SelectedId)
    fetch(`https://meddesknode-f0djang2hcfub6dc.eastus2-01.azurewebsites.net/api/updateproducts`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "User-Agent": "*",
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
    id:SelectedId,
    Title:Title,
    Description:Description,
    Weight:Weight,
    Manufacture:Manufacture,
    Barcode_Number:Barcode_Number,
    Data_Sheet:Data_Sheet,
    Product_Image :Product_Image ,
    DateTime:new Date(),
    }),
    }
    )
    .then((response) => {
    if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response?.status} ${response?.statusText}`
        );
      }
    
      return response.json();
    })
    .then((res) => {
      console.log(res);
    });
    }

const generatePDF = (scannedData) => {
    const doc = new jsPDF();
    
    doc.setFontSize(12);
    doc.text("Product Information", 20, 20);
  
    // doc.text(`ID: ${scannedData.id}`, 20, 30);
    // doc.text(`Title: ${scannedData.Title}`, 20, 40);
    // doc.text(`Description: ${scannedData.Description}`, 20, 50);
    // doc.text(`Weight: ${scannedData.Weight}`, 20, 60);
    // doc.text(`Manufacture: ${scannedData.Manufacture}`, 20, 70);
    // doc.text(`Barcode Number: ${scannedData.Barcode_Number}`, 20, 80);
    doc.text(`DateTime: ${scannedData.DateTime}`, 20, 30);
    doc.text(`Data Sheet: ${scannedData.Data_Sheet}`, 20, 40);
   
    doc.text(`Product Image:`, 20, 50);
    doc.addImage(scannedData?.Product_Image,60,64,80,80)
  
    // Save the PDF
    doc.save("ProductData.pdf");
  };
    
  function sendMessage() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
  console.log(Product_Image,"Product_iamge")
    if (file) {
       console.log(file,"file")
       const reader = new FileReader();
  
                  // Once the file is loaded, convert to Base64 and display
                  reader.onload = function(event) {
                      const base64String = event.target.result;
                    console.log(base64String)
                    setProduct_Image(base64String)
                  };
  
                  // Read the file as a Data URL (Base64)
                  reader.readAsDataURL(file);
    }
    fileInput.value = '';
  }
return (
    <div id="main"
    style={{  
    flex:1,
    backgroundColor: "#156082",
    width: "100",
    height: "137vh",
    alignItems:"center",
    justifyContent:"center",
    fontFamily:"Poppins",
    
    }}
    >
    <div style={{height:"100%", width: "100%",overflowX:"hidden" }}>
    
    
    <div style={{ width: "94%",
    maxHeight:'100px',height:"100%",marginLeft:"3%",
    backgroundColor:"transparent",
    display:"flex",flexDirection:"column",justifyContent:"space-between"
    ,textAlign:"flex-start",
    alignItems:"flex-start",
    color:"#fff",fontSize:"28px",paddingTop:"2%"
    }}>
    <div style={{display:"flex",width:"100%",justifyContent:"space-between", }}>
    
    
    <div onClick={()=>{navigate("/")}} style={{width:"60%",backgroundColor:"#fff",justifyContent:"space-between",
    display:"flex",padding:"1%",maxHeight:"70px",cursor:"pointer"}}>
    
    
    <img id="logodiv" alt="" src={require('../img/med.png')} style={{width:"95%",height:"26px"}} />
    </div>
    <div style={{ width: "55%",border:"3px solid #9ea3ac", 
    maxHeight:'40px',height:"100%",
    justifyContent:"center",textAlign:"center",
    alignItems:"center",color:"#fff",fontSize:"60%",display:"flex",fontWeight:"600",
    overflow:"hidden",
    marginLeft:"15%"}}>
    Products Data Viewer</div>
    <div disabled style={{ width: "30%",
    maxHeight:'40px',height:"100%",
    justifyContent:"center",textAlign:"center",
    alignItems:"center",color:"#156082",fontSize:"70%",display:"flex",fontWeight:"500",
    overflow:"hidden",
    marginLeft:"25%",backgroundColor:"#156082",}}>
    ADD</div>
    </div><span style={{fontSize:"70%"}}>It Just works Better</span>
    </div>
    <div style={{alignItems:"center", width: "94%",
    maxHeight:'419px',height:"100%",marginLeft:"3%",marginTop:"1.5%",
    justifyContent:"space-between",display:"flex"
    }}>
    <div style={{ width: "100%",
    maxHeight:'419px',height:"100%",marginLeft:"0%",marginTop:"0%",
    justifyContent:"center", alignItems:"flex-start",display:"flex",
    flexDirection:"column",
    
    }}>
    <div style={{border:"2px solid #fff", width: "100%",
    height:"100%",
    justifyContent:"center",textAlign:"center",
    alignItems:"center",display:"flex",color:"#000",fontSize:"18px",
    backgroundColor:"#fff",  overflowX:"hidden"
    }}>
    
    <div style={{ width: "82%",
    height:"100%",
    textAlign:"center",
    display:"flex",color:"#000",fontSize:"18px",
    backgroundColor:"#fff",
    flexDirection:"column",alignItems:"center"
    }}>
    <div style={{ width: "100%",border:"2px solid #d1d5db",maxHeight:"440px",
    height:"100%",marginTop:"1%"}}  class="table table-responsive" >
    <table class="table table-responsive">
    <thead style={{fontWeight:"500",fontSize:"12px",textAlign:"left"}}>
    <tr style={{backgroundColor:"#e5e7eb"}}>
    <th style={{border:"none"}}>TITLE</th>
    <th style={{border:"none"}}>DESCRIPTION</th>
    <th style={{border:"none"}}>WEIGHT</th>
    <th style={{border:"none"}}>MANUFACTURE</th>
    <th style={{border:"none"}}>BARCODE NUMBER</th>
    <th style={{border:"none"}}>DATA SHEET</th>
    <th style={{border:"none"}}>PRODUCT IMAGE</th>
    <th style={{border:"none"}}>Edit</th>
    <th style={{border:"none"}}>Delete</th>
    
    
    </tr>
    </thead>
    <tbody  style={{fontWeight:"500",fontSize:"14px",textAlign:"left",
    backgroundColor:"#d1d5db"}}>
        {data?.map((item,index)=>
            <tr>
    <td style={{backgroundColor:"#fff",borderBottom:"2px solid #d1d5db"}}>{item?.Title}</td>
    <td style={{borderRight:"2px solid #d1d5db",borderTop:"none"}}>{item?.Description}</td>
    <td style={{borderRight:"2px solid #d1d5db",borderTop:"none"}}>{item?.Weight}</td>
    <td style={{borderRight:"2px solid #d1d5db",borderTop:"none"}}>{item?.Manufacture}</td>
    <td style={{borderRight:"2px solid #d1d5db",borderTop:"none",}}>{item?.Barcode_Number?.slice(0,10)}...</td>
    <td onClick={()=>generatePDF(item)} style={{borderRight:"2px solid #d1d5db",borderTop:"none",cursor:"pointer"}}>
      <img alt="" src={require("../img/datasheet.png")} 
    style={{width:"20px",height:"20px"}} /></td>
    <td style={{borderRight:"2px solid #d1d5db",borderTop:"none",}}>{item?.Product_Image?.slice(0,10)}...</td>
    <td onClick={()=>{setSelectedId(item.id);setTitle(item?.Title);setDescription(item?.Description);setWeight(item?.Weight);setManufacture(item?.Manufacture);
    setBarcode_Number(item?.Barcode_Number);setData_Sheet(item?.Data_Sheet);setProduct_Image(item?.Product_Image);
document.getElementById("myModal").style.display="block"}} style={{borderRight:"2px solid #d1d5db",borderTop:"none",cursor:"pointer"}}><img alt="" src={require("../img/pencil.png")} 
style={{width:"20px",height:"20px"}} /></td>
    <td onClick={()=>deleteid(item?.id)} style={{borderRight:"2px solid #d1d5db",borderTop:"none",cursor:"pointer"}}><img alt="" src={require("../img/delete.png")} 
    style={{width:"20px",height:"20px"}} /></td>
    </tr>
        )}
    
    
    </tbody>
    </table>
    </div>
    </div>
    </div>
    
    </div>
    
    
    
    </div>
    <div>
    
    <div style={{marginTop:"19.55vh",width:"96%",paddingLeft:"2%",color:"white",paddingRight:"0%"}}>
    
    <div style={{fontSize:"16px"}}>
    
    
    Disclaimers and warning :
    </div>
    <div style={{fontSize:"16px",fontWeight:"600"}}>
    Is it to be clear that All in and above of the data presentation and the 
    presented datasheet, and the information presented, including any medicine or personal or medical data, 
    is solely for illustrative, demonstration, and educational explanatory purposes and should not 
    be construed as real data or representative of any actual real medical data .
    </div>
    <div style={{fontSize:"16px",marginTop:"1.25%"}}>
    This webpage is been powered by MedDesk-AI all rights received ©
    </div>
    <div id="myModal" className="modal">
    
    <div className="modal-content">
      <span className="close" onClick={()=>{document.getElementById("myModal").style.display="none"}}>&times;</span>
   

     
      <h4 style={{color:"#156082"}}>Add Data</h4>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>

     
      <div style={{width:"80%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    flexDirection:"column"}}>
      <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    }}>

      
      <label>Title:</label>

<input value={Title} onChange={(e)=>setTitle(e.target.value)} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
</input>
</div>
<div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    }}>
<label>Manufacture:</label>

<input value={Manufacture} onChange={(e)=>setManufacture(e.target.value)} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
</input>
</div>
<div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    }}>
<label>Weight:</label>

<input value={Weight} onChange={(e)=>setWeight(e.target.value)} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
</input>
</div>
<div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    }}>
<label>Description:</label>

<input value={Description} onChange={(e)=>setDescription(e.target.value)} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
</input>
</div>
<div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    }}>
<label>Barcode:</label>

<input value={Barcode_Number} onChange={(e)=>setBarcode_Number(e.target.value)} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
</input>
</div>

<div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
    }}>
<label>Product Picture:</label>


<input  type="file" id="file-input"
onChange={(e)=>{sendMessage()}} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
</input>
</div>
<div  style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
}}>
{/* <button onClick={()=>{updateitem();document.getElementById("myModal").style.display="none"}} 
style={{border:"2px solid #156082",width:"40%",backgroundColor:"#156082",height:"30px",
cursor:"pointer"}}>


<span style={{color:"white"}} >
Update</span>
</button> */}
<button onClick={()=>{updateitem();document.getElementById("myModal").style.display="none"}}  style={{border:"2px solid #156082",width:"40%",backgroundColor:"#156082",height:"30px",
cursor:"pointer",color:"white"
}}>Update</button>
</div>
</div>

</div>

    </div>
  </div>
    </div>
    </div>
    </div>
    </div>
    
    
    );
}

export default View;
