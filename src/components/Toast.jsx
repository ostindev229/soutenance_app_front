import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
function Toast(prop) {
  return (
    <div
      className={`toast ${
        prop.type === "success" ? "bg-[#2f855a]" : "bg-[#ea1c1c]"
      }`}
    >
      {" "}
      <div className="icon">
        {prop.type === "success" ? (
          <FaCheckCircle className="icon-success" />
        ) : (
          <FaTimesCircle className="icon-error" />
        )}
      </div>
      <div className="message">{prop.message}</div>{" "}
    </div>
  );
}

export default Toast;
