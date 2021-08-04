import Popup from "../components/shared/Popup";

const PopupPage = (): JSX.Element => {
  return (
    <div>
      <h1>Popup Page</h1>
      <Popup
        header="Urgent Case Reporting"
        subHeader="Your feedback will facilitate the deployment of parking wardens to address illegal parking at public roads and HDB/URA car parks."
        footer="Please provide the correct incident location to minimise any inconvenience to the public <a href='tel:1800 476 1600'>1800 476 1600</a>"
        buttons={[
          { title: "Call", styleType: "outlined" },
          { title: "Continue" },
        ]}
      />
    </div>
  );
};

export default PopupPage;
