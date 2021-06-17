import React from "react";

interface TabPanelProps {
  index: number;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
