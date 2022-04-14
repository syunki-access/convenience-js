
const HeaderTitleText = (props) => {
  return (<>
    <h2 id="titleText" className="title-text notFoundTitle">
      {props.titleText}
    </h2>
  </>)
};

HeaderTitleText.defaultProps = {
  titleText:'No Title', 
};

export default HeaderTitleText;
