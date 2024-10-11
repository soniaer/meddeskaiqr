import '../App.css';



function Main() {
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
Title
       </div>
       <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'40px',height:"100%",marginLeft:"0%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Manufacture
       </div>
       <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'40px',height:"100%",marginLeft:"0%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Weight
       </div>
       <div style={{border:"2px solid #fff", width: "100%",
        maxHeight:'212px',height:"100%",marginLeft:"0%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Description
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
       }}>
Data Sheet</div>
       </div>
       <div style={{border:"2px solid #fff", width: "94%",
        maxHeight:'350px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"18px"
       }}>
Product Picture
       </div>
        </div>
        <input id="barcode" type="text" style={{alignItems:"center",border:"2px solid #fff", width: "30%",
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
<div id="myModal" class="modal">
    
        <div class="modal-content">
          <span class="close" onClick={()=>{document.getElementById("myModal").style.display="none"}}>&times;</span>
       

         
          <h4 style={{color:"#156082"}}>Add Data</h4>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>

         
          <div style={{width:"80%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        flexDirection:"column"}}>
          <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>

          
          <label>Title:</label>
  
   <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
   </input>
   </div>
   <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>
   <label>Manufacture:</label>
  
   <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
   </input>
   </div>
   <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>
   <label>Weight:</label>
  
  <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
  </input>
  </div>
  <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>
  <label>Description:</label>
  
  <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
  </input>
  </div>
  <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>
  <label>Barcode:</label>
  
  <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
  </input>
  </div>
  <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>
  <label>Datasheet:</label>
  
  <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
  </input>
  </div>
  <div style={{width:"100%",paddingTop:"1%",paddingBottom:"1%",color:"#156082",display:"flex",justifyContent:"space-between",
        }}>
  <label>Product Picture:</label>
  
  <input style={{width:"60%",border:"2px solid #156082",marginBottom:"2%"}}>
  </input>
  </div>

   </div>
   
   </div>
   <button style={{border:"2px solid #156082",width:"40%",backgroundColor:"#156082",height:"30px",
  cursor:"pointer"}}>


<span style={{color:"white"}} onClick={()=>{document.getElementById("myModal").style.display="none"}}>
 Add</span>
 </button>
        </div>
      </div>
</div>
</div>

    </div>
 
  );
}

export default Main;
