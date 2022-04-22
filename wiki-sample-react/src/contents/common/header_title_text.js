import ConvertHtml from "lib/convert_html";

const HeaderTitleText = (props) => {
  return (<>
    <h2 id="titleText" className="title-text notFoundTitle">
      <ConvertHtml 
        text={props.titleText} 
      />
    </h2>
  </>)
};

HeaderTitleText.defaultProps = {
  titleText:'No Title', 
};

export default HeaderTitleText;
