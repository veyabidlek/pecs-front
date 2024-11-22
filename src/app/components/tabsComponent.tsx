import React, { useState } from "react";

interface TabProps {
  id: number;
  name: string;
}

const TabsComponent = ({
  tabs,
  content,
}: {
  tabs: TabProps[];
  content: React.ReactNode[];
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`tab ${activeTab === index ? "active" : ""} p-2`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {content.map((item, index) => (
          <div
            key={index}
            className={`board-container ${
              activeTab === index ? "block" : "hidden"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
