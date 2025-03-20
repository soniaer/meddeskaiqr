import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import jsPDF from "jspdf";

function Main() {
  const [message, setMessage] = useState("Connect NFC Reader");

  const connectToDevice = async () => {
    try {
      console.log("device")
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x1234 }], // Replace with your NFC reader's vendor ID
      });
console.log(device,"device")
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);

      setMessage(`Connected to NFC Reader: ${device.productName}`);
      console.log(message)
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };


useEffect(()=>{
  connectToDevice()
},[])  
  const [Title,setTitle] = useState("")
const [Description,setDescription] = useState("")
const [Weight,setWeight] = useState("")
const [Manufacture,setManufacture] = useState("")
const [Barcode_Number,setBarcode_Number] = useState("")
const [Data_Sheet,setData_Sheet] = useState("")
const [Product_Image,setProduct_Image] = useState("")
const [scannedData,setScannedData] = useState({
  "id": "NA",
  "Title": "NA",
  "Description": "NA",
  "Weight": "NA",
  "Manufacture": "NA",
  "Barcode_Number": "NA",
  "Data_Sheet": "NA",
  "Product_Image": "NA",
  "DateTime": "NA"
})
const navigate = useNavigate();



useEffect(() => {
  let buffer = '';
  let timer = null;

  const handleKeyPress = (event) => {
    // Ignore any special key presses (like Enter, Shift, etc.)
    if (event.key.length === 1) {
      buffer += event.key;

      // Clear buffer if there is a delay in keypress (more than 100ms means manual entry)
      if (timer) clearTimeout(timer);

      // Set a timeout to check when input has stopped
      timer = setTimeout(() => {
        console.log(buffer,"**********SCANNED BARCODE**********")
        fetch(`https://meddesknode-f0djang2hcfub6dc.eastus2-01.azurewebsites.net/api/getscannedproducts`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "User-Agent": "*",
            "Content-Type": "application/json",
          },
      body: JSON.stringify({
        Barcode_Number:buffer,
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
          if(res?.message === undefined || res?.message === "undefined" || res?.message === null || res?.message === "null" ){
            setScannedData(res)

          }else{
setScannedData({
  "id": "NA",
  "Title": "NA",
  "Description": "NA",
  "Weight": "NA",
  "Manufacture": "NA",
  "Barcode_Number": "NA",
  "Data_Sheet": "NA",
  "Product_Image": "NA",
  "DateTime": "NA"
})
          }
        });
       
        buffer = '';  // Clear the buffer after capturing the full barcode
      }, 100);
    }
  };

  // Add event listener for keypress
  window.addEventListener('keypress', handleKeyPress);

  // Cleanup event listener on component unmount
  return () => {
    window.removeEventListener('keypress', handleKeyPress);
  };
}, []);


const generatePDF = () => {
  console.log("generatePDF",scannedData.id)
  if(scannedData.id && scannedData.id!=="NA"){
    const doc = new jsPDF();
    
    doc.setFontSize(12);
    doc.text("Product Information", 20, 20);

    doc.text(`DateTime: ${scannedData.DateTime}`, 20, 30);
  doc.text(`Data Sheet: ${scannedData.Data_Sheet}`, 20, 40);
 
  doc.text(`Product Image:`, 20, 50);
    doc.addImage(scannedData.Product_Image,60,64,80,80)

    // Save the PDF
    doc.save("ProductData.pdf");
  }
  };


const adddata =async() =>{
  console.log(Data_Sheet)
  fetch(`https://meddesknode-f0djang2hcfub6dc.eastus2-01.azurewebsites.net/api/addproduct`,
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
body: JSON.stringify({
  Title:Title,
  Description:Description,
  Weight:Weight,
  Manufacture:Manufacture,
  Barcode_Number:Barcode_Number,
  Data_Sheet:Data_Sheet,//Array.from(Data_Sheet)
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
  }).catch((error) => console.error("Error:", error));

}


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
  

  
  const downloadPDF = (binaryData) => {
    // Convert array to Uint8Array
    const uint8Array = new Uint8Array(binaryData);

    // Create a Blob from the binary data
    const blob = new Blob([uint8Array], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
};


  function sendMessage2() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file); // Read as binary
        reader.onload = async () => {
            const binaryData = new Uint8Array(reader.result); // Convert to Uint8Array
            setData_Sheet(Array.from(binaryData)); // Convert to JSON-friendly array
        };
    }
    fileInput.value = "";
}

  return (
    <div
      style={{  
        flex:1,
        backgroundColor: "#156082",
        width: "100%",
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

        
          <div style={{width:"60%",backgroundColor:"#fff",justifyContent:"space-between",
        display:"flex",padding:"1%",maxHeight:"70px",}}>

         
     <img alt="" src={require('../img/med.png')} style={{width:"95%",height:"26px"}} />
     </div>
     <div style={{ width: "55%",border:"3px solid #9ea3ac", 
          maxHeight:'40px',height:"100%",
          justifyContent:"center",textAlign:"center",
          alignItems:"center",color:"#fff",fontSize:"60%",display:"flex",fontWeight:"600",
          overflow:"hidden",
          marginLeft:"15%"}}>
Barcode / QR Data Viewer</div>
<div onClick={()=>{document.getElementById("myModal").style.display="block"}} style={{ width: "30%",
          maxHeight:'40px',height:"100%",
          justifyContent:"center",textAlign:"center",
          alignItems:"center",color:"#000",fontSize:"70%",display:"flex",fontWeight:"500",
          overflow:"hidden",
          marginLeft:"25%",backgroundColor:"#fff",cursor:"pointer"}}>
ADD</div>
     </div><span style={{fontSize:"70%"}}>It Just works Better</span>
          </div>
        <div style={{alignItems:"center", width: "94%",
        maxHeight:'350px',height:"100%",marginLeft:"3%",marginTop:"1.5%",
        justifyContent:"space-between",display:"flex",
       }}>
         <div style={{alignItems:"center", width: "94%",
        maxHeight:'350px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"space-between",
       }}>
    <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'40px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px",
       }}>
Title: {scannedData?.Title}
       </div>
       <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'40px',height:"100%",marginLeft:"0%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Manufacture: {scannedData?.Manufacture}
<div>
    </div>
       </div>
       <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'40px',height:"100%",marginLeft:"0%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Weight: {scannedData?.Weight}
       </div>
       <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'212px',height:"100%",marginLeft:"0%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Description: {scannedData?.Description}
       </div>
       </div>
       <div style={{ width: "94%",
        maxHeight:'350px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
       display:"flex",color:"#fff",fontSize:"18px"
       }}>
        <div style={{border:"2px solid #fff", width: "50%",
        maxHeight:'215px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px", overflow:"hidden",
        flexDirection:"column",cursor:"pointer"
       }}>
Data Sheet:
<img alt="" src={require('../img/datasheet.png')} style={{width:"16%",marginTop:"23%"}} />
<span onClick={()=>downloadPDF(scannedData?.Data_sheet_binary?.data)} style={{fontSize:"16px",cursor:"pointer"}}>Download
  </span>
</div>
       </div>
       <div style={{border:"2px solid #fff", width: "94%",
        maxHeight:'350px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px",
        padding:"1%",flexDirection:"column"
       }}>

Product Picture: 
<img alt="" src={scannedData?.Product_Image} style={{width:"50%",marginTop:"5%"}} />       </div>
        </div>
        <input disabled value={scannedData?.Barcode_Number} id="barcode" type="text" 
        style={{alignItems:"center",border:"2px solid #fff", width: "30%",
        maxHeight:'40px',height:"100%",marginLeft:"35%",marginTop:"1.5%",
        fontSize:"17px",color:"#fff",
        alignSelf:"center",backgroundColor:"transparent",textAlign:"center",
       }} placeholder="Barcode / QR code number"  />
            <div style={{marginTop:"20vh",width:"96%",paddingLeft:"2%",color:"white",paddingRight:"0%"}}>

<div style={{fontSize:"16px"}}>


  Disclaimers and warning :
  </div>
  <div style={{fontSize:"16px",fontWeight:"600"}}>
Is it to be clear that All in and above of the data presentation and the 
presented datasheet, and the information presented, including any medicine or personal or medical data, 
is solely for illustrative, demonstration, and educational explanatory purposes and should not 
be construed as real data or representative of any actual real medical data .
</div>
<div style={{fontSize:"16px",marginTop:"1.2%"}}>


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
  <label>Datasheet:</label>
  
  {/* <input value={Data_Sheet} onChange={(e)=>setData_Sheet(e.target.value)} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
  </input> */}
    <input  type="file" id="file-input"
  onChange={(e)=>{sendMessage2()}} style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
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
<button onClick={()=>{adddata();document.getElementById("myModal").style.display="none"}} 
style={{border:"2px solid #156082",width:"40%",backgroundColor:"#156082",height:"30px",
cursor:"pointer"}}>


<span style={{color:"white"}} >
Add</span>
</button>
<button onClick={()=>{navigate("/view")}} style={{border:"2px solid #156082",width:"40%",backgroundColor:"#156082",height:"30px",
cursor:"pointer",color:"white"
}}>View</button>
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

export default Main;
