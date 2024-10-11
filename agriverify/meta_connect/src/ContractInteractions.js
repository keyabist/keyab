import React, { useState } from 'react';
import { ethers } from 'ethers';
import AgriVerify from './AgriVerify.json';  // ABI JSON file

const ContractInteractions = ({ account, setCertificationDetails }) => {
  const [cropId, setCropId] = useState('');
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');

  const contractAddress = '0xEf8615E77566FbFa9c412b929FC31179bD955500';  // Add your deployed contract address here
  const abi = AgriVerify.abi;

  const addCrop = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.addCrop(cropName, location, cropId);
        await tx.wait();
        console.log(`Crop added: ${cropName} with ID ${cropId}`);
      }
    } catch (error) {
      console.log('Error adding crop:', error);
    }
  };

  const certifyCrop = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.getCertified(cropId);
        await tx.wait();
        console.log(`Crop certified with ID ${cropId}`);

        const isCertified = await contract.isCertified(cropId);
        setCertificationDetails(`Crop ID ${cropId} is certified: ${isCertified}`);
      }
    } catch (error) {
      console.log('Error certifying crop:', error);
    }
  };

  return (
    <div>
      <h3>Add Crop</h3>
      <input
        type="text"
        placeholder="Crop Name"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Crop ID"
        value={cropId}
        onChange={(e) => setCropId(e.target.value)}
      />
      <button onClick={addCrop}>Add Crop</button>

      <h3>Certify Crop</h3>
      <input
        type="text"
        placeholder="Crop ID to Certify"
        value={cropId}
        onChange={(e) => setCropId(e.target.value)}
      />
      <button onClick={certifyCrop}>Certify Crop</button>
    </div>
  );
};

export default ContractInteractions;
