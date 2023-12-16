import React from "react";

interface ModulesListProps {
  modules: string[];
}

const ModulesList: React.FC<ModulesListProps> = ({ modules }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Module Name</th>
        </tr>
      </thead>
      <tbody>
        {modules.map((module, index) => (
          <tr key={index}>
            <td>{module}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModulesList;
