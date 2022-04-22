import ConvertHtml from "lib/convert_html";

const HeaderDescriptionText = (props) => {
  return (<>
    <p id="descriptionText">
      <ConvertHtml 
        text={props.descriptionText} 
      />
    </p>
  </>)
};

HeaderDescriptionText.defaultProps = {
  descriptionText:'---', 
};

export default HeaderDescriptionText;
