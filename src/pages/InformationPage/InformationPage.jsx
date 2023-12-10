import Accordion from "../../components/Accordion/Accordion";
import Header from "../../components/Header/Header";

function InformationPage() {
  return (
    <>
      <div className="page">
        <Header />
        <h1>Your guide</h1>
        <h2>Make sorting easy</h2>
        <Accordion />
      </div>
    </>
  );
}

export default InformationPage;
