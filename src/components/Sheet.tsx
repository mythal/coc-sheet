import { SheetState } from "../types";
import { connect } from "react-redux";


const Sheet = () => {
  return null;
};


const mapStateToProps = ({ note }: SheetState) => ({ name: note });


export default connect(mapStateToProps)(Sheet);
