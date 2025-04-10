import React, { useState, useEffect } from 'react';
import { Button, Modal, List, Checkbox } from 'antd';

const ShopFilters = ({ filterOptions, setFilters }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
    const [selectedFilters, setSelectedFilters] = useState(() => {
        return filterOptions.reduce((acc, option) => {
            acc[option.id] = [];
            return acc;
        }, {});
    });

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setFilters(selectedFilters)
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleCheckboxChange = (optionId, checkedValues) => {
        const newValues = [...selectedCheckboxes];
        checkedValues.forEach(value => {
            if (!newValues.includes(value)) {
                newValues.push(value);
            }
        });
        setSelectedCheckboxes(newValues);
        setSelectedFilters(prevState => ({
            ...prevState,
            [optionId]: checkedValues,
        }));
    };

    useEffect(() => {
        if (isModalVisible && filterOptions.length > 0) {
            setSelectedOption(filterOptions[0]);
            setSelectedCheckboxes([])
            setSelectedFilters(() => {
                return filterOptions.reduce((acc, option) => {
                    acc[option.id] = [];
                    return acc;
                }, {});
            });
        }
    }, [isModalVisible]);

    return (
        <>
            <Button onClick={handleButtonClick} color='geekblue' >Open Filters</Button>
            <Modal
                title="Filter Options"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={500}
            >
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '200px', borderRight: '1px solid #f0f0f0', paddingRight: '20px' }}>
                        <List
                            dataSource={filterOptions}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.id}
                                    onClick={() => handleOptionClick(item)}
                                    style={{ cursor: 'pointer', fontWeight: selectedOption?.id === item.id ? 'bold' : 'normal' }}
                                >
                                    {item.title}
                                </List.Item>
                            )}
                        />
                    </div>

                    {/* Right Side - Checkboxes */}
                    <div style={{ flex: 1 }}>
                        {selectedOption && (
                            <Checkbox.Group onChange={(changedValues) => handleCheckboxChange(selectedOption.id, changedValues)} value={selectedCheckboxes}>
                                {selectedOption.items.map((item) => (
                                    <Checkbox key={item} value={item} style={{ display: 'block', marginBottom: '8px' }}>
                                        {item}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ShopFilters;