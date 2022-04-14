
const HeaderDescriptionText = (props) => {
  return (<>
    <p id="descriptionText">
      {props.descriptionText}
    </p>
  </>)
};

HeaderDescriptionText.defaultProps = {
  descriptionText:'---', 
};

export default HeaderDescriptionText;
