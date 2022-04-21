
const HeaderDescriptionText = (props) => {
  return (<>
    <p id="descriptionText">
      <span dangerouslySetInnerHTML={{__html: props.descriptionText}}/>
    </p>
  </>)
};

HeaderDescriptionText.defaultProps = {
  descriptionText:'---', 
};

export default HeaderDescriptionText;
