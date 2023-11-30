import green_tick_img from "../assets/green_tick.png";

const FormSuccess = () => {
  return (
    <div style={{
      background: "#dadada",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh"
    }}>
      <div style={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70%",
        width: "70%",
        borderTop: "8px solid #41A145"
      }}>
        <img src={green_tick_img} alt="" style={{height: "70px"}}/>
        <h2>Thank you!</h2>
        <h4>You form has been successfully submitted</h4>
        <p>Now you may leave this page</p>
      </div>
    </div>
  )
}

export default FormSuccess;