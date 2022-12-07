import { createElement } from "react";
import { create } from "kombine";
import "./App.css";

const HeaderSection = ({ heading }) => <header>{heading}</header>;
const HeaderDescriptionSection = ({ description }) => (
  <section>{description}</section>
);
const ContentSection = () => <section>when dsls are a good fit?</section>;
const FooterSection = () => <footer>that's all folks!</footer>;

const schema = {
  type: "div",
  children: [
    { type: "HeaderSection" },
    {
      type: "HeaderDescriptionSection",
      condition: (props) => props.isEven ?? true,
    },
    { type: "ContentSection" },
    { type: "FooterSection" },
  ],
};

const components = {
  HeaderSection,
  ContentSection,
  FooterSection,
  HeaderDescriptionSection,
};

const HomePage = create(createElement, schema, components);

function App() {
  return (
    <div className="App">
      <HomePage
        heading="Data oriented programming"
        description="Note that this prop is passed down the tree"
      />
    </div>
  );
}

export default App;
