import React from 'react';

const ServiceRow = ({ service, handleServiceSelect, isSelected }) => {
  const handleSelect = () => {
    handleServiceSelect(service);
  };

  return (
    <tr>
      <td><b>{service.name}</b></td>
      <td align="center">{service.price} DT</td>
      <td align="center">{service.duration} Min</td>
      <td align="center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
        />
      </td>
    </tr>
  );
};

export default ServiceRow;