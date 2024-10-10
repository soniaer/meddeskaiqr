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
        <div style={{ width: "60%",
          maxHeight:'100px',height:"100%",marginLeft:"3%",
          backgroundColor:"transparent",
          display:"flex",flexDirection:"column",justifyContent:"space-between"
          ,textAlign:"flex-start",
          alignItems:"flex-start",
          color:"#fff",fontSize:"30px",paddingTop:"2%"
         }}>
          <div style={{display:"flex",width:"100%", }}>

        
          <div style={{width:"50%",backgroundColor:"#fff",justifyContent:"center",
        display:"flex",padding:"1%",maxHeight:"70px"}}>

         
     <img alt="" src={require('../img/med.png')} style={{width:"90%",height:"34px"}} />
     </div>
     <div style={{ width: "55%",border:"3px solid #9ea3ac", 
          maxHeight:'40px',height:"100%",
          justifyContent:"center",textAlign:"center",
          alignItems:"center",color:"#fff",fontSize:"85%",display:"flex",fontWeight:"600",
          overflow:"hidden",
          marginLeft:"21%"}}>
Barcode / QR Data Viewer</div>
     </div><span style={{fontSize:"85%"}}>It Just works Better</span>
          </div>
        <div style={{alignItems:"center", width: "94%",
        maxHeight:'450px',height:"100%",marginLeft:"3%",marginTop:"2%",
        justifyContent:"space-between",display:"flex"
       }}>
         <div style={{alignItems:"center", width: "94%",
        maxHeight:'450px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"space-between",
       }}>
    <div style={{border:"2px solid #fff", width: "97.5%",
        maxHeight:'50px',height:"100%",marginLeft:"1%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"20px",
       
       }}>
Title
       </div>
       <div style={{border:"2px solid #fff", width: "97.5%",
        maxHeight:'50px',height:"100%",marginLeft:"1%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"20px"
       }}>
Manufacture
       </div>
       <div style={{border:"2px solid #fff", width: "97.5%",
        maxHeight:'50px',height:"100%",marginLeft:"1%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"20px"
       }}>
Weight
       </div>
       <div style={{border:"2px solid #fff", width: "97.5%",
        maxHeight:'265px',height:"100%",marginLeft:"1%",marginTop:"1%",
        justifyContent:"flex-start", paddingLeft:"1%",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"20px"
       }}>
Discription
       </div>
       </div>
       <div style={{ width: "94%",
        maxHeight:'450px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
       display:"flex",color:"#fff",fontSize:"20px"
       }}>
        <div style={{border:"2px solid #fff", width: "44%",
        maxHeight:'250px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"20px", overflow:"hidden",
       }}>
Data Sheet</div>
       </div>
       <div style={{border:"2px solid #fff", width: "94%",
        maxHeight:'450px',height:"100%",marginLeft:"0%",marginTop:"0%",
        justifyContent:"center",textAlign:"center",
        alignItems:"center",display:"flex",color:"#fff",fontSize:"20px"
       }}>
Product Picture
       </div>
        </div>
        <input id="barcode" type="text" style={{alignItems:"center",border:"2px solid #fff", width: "30%",
        maxHeight:'50px',height:"100%",marginLeft:"35%",marginTop:"1%",
        fontSize:"19px",color:"#fff",
        alignSelf:"center",backgroundColor:"transparent",textAlign:"center",
       }} placeholder="Barcode / QR code number"  />
            <div style={{marginTop:"20vh",width:"96%",paddingLeft:"2%",color:"white",paddingRight:"0%"}}>

<div style={{fontSize:"18px"}}>


  Disclaimers and warning :
  </div>
  <div style={{fontSize:"18px",fontWeight:"600"}}>
Is it to be clear that All in and above of the data presentation and the 
presented datasheet, and the information presented, including any medicine or personal or medical data, 
is solely for illustrative, demonstration, and educational explanatory purposes and should not 
be construed as real data or representative of any actual real medical data .
</div>
<div style={{fontSize:"18px",marginTop:"1.2%"}}>


This webpage is been powered by MedDesk-AI all rights received ©
</div>
</div>
</div>
    </div>
  );
}

export default Main;
