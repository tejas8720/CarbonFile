import React from 'react';
import { Button } from '@aragon/ui'
import { useState } from 'react';
// import votes from "../abi/votes.json" ;
import {ethers} from 'ethers';
const lighthouse = require('@lighthouse-web3/sdk');

// New NFT
// const voteProject = document.getElementById('vote');
// voteProject.addEventListener('click', voteForProject);
// console.log("hello");

const voteAddress = "0xD5f2a720e0f337aac7CD710b8818aaecE53F8db7"
const voteABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    // vote for project
    "function voteForProject(bytes32 project)",
    // token holders
    "function totalVotesFor(bytes32 project) view returns(uint)",
    // token count
    "function projectList(uint) view returns(uint)"
]
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Voting() {
  const [arr,setArr] = useState([
    {
     "Project Owner": "Owner1",
     "Offset project Type": "Project A",
     "Project Title": "ABC",
     "Project developer": "Starbucks",
     "Project Start date": "04/01/2023",
     "Project description": "Loreum ipsum",
     "SOC": 1.2,
     "Carbon credits": 5,
     "address": "0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000021",
     "votes": 0,
     "voted":false
    },
    {
     "Project Owner": "Owner2",
     "Offset project Type": "Project B",
     "Project Title": "ABC",
     "Project developer": "Microsoft",
     "Project Start date": "02/07/2022",
     "Project description": "Loreum ipsum",
     "SOC": 3,
     "Carbon credits": 4,
     "address": "0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000012",
     "votes": 0,
     "voted":false
    },
    {
     "Project Owner": "Owner3",
     "Offset project Type": "Project C",
     "Project Title": "ABC",
     "Project developer": "Kimberley",
     "Project Start date": "01/05/2022",
     "Project description": "Loreum ipsum",
     "SOC": 4,
     "Carbon credits": 6,
     "address": "0x4b696d6265726c7920636c61726b20677265656e206669656c64000000000014",
     "votes": 0,
     "voted":false
    }
   ])
   const [votes1, setVotes1] = useState(0)
   const [voted1, setVoted1] = useState(false)

   const [votes2, setVotes2] = useState(0)
   const [voted2, setVoted2] = useState(false)

   const [votes3, setVotes3] = useState(0)
   const [voted3, setVoted3] = useState(false)

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  // reading contract data
  const pContract = new ethers.Contract(voteAddress, voteABI, provider);
  // writing to contract data
  const sContract = new ethers.Contract(voteAddress, voteABI, signer);

  function vote_click1(project){
  console.log(arr)
  sContract.voteForProject(project);
  sContract.totalVotesFor(project).then(data => {
    const vote=parseInt(data['_hex'],16)+1;
    setVotes1(vote);
    setVoted1(true);
    console.log(vote,votes1);
 }).catch(err => console.log(err));
 }
 function vote_click2(project){
  console.log(arr)
  sContract.voteForProject(project);
  sContract.totalVotesFor(project).then(data => {
    const vote=parseInt(data['_hex'],16)+1;
    setVotes2(vote);
    setVoted2(true);
    console.log(vote,votes2);
 }).catch(err => console.log(err));
 }
 function vote_click3(project){
  console.log(arr)
  sContract.voteForProject(project);
  sContract.totalVotesFor(project).then(data => {
    const vote=parseInt(data['_hex'],16)+1;
    setVotes3(vote);
    setVoted3(true);
    console.log(vote,votes3);
 }).catch(err => console.log(err));
 }

 const uploadText = async(data) =>{
  const apiKey = "c7be460a-1483-4176-bd27-8050d78a1266"; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  const response = await lighthouse.uploadText(
    toString(data),
    apiKey
  );
  
  // Display response
  console.log(response);
  /*
  {
    data: {
      Name: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Hash: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Size: '24'
    }
  }
  */
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash);
}
if (votes1>=3){
uploadText(arr[0])
}
if (votes2>=3){
  uploadText(arr[0])
  }
if (votes3>=3){
    uploadText(arr[0])
  }
  return (
    <>
    
    <table class="table table-light table-striped text-center">
  <thead>
    <tr>
      <th scope="col">Project Name</th>
      <th scope="col">Owner Name</th>
      <th scope="col">SOC</th>
      <th scope="col">Carbon credits</th>
      <th scope="col">Vote</th>
    </tr>
  </thead>
  <tbody>
     <tr>
      <th scope="row">{arr[0]['Offset project Type']}</th>
      <td>{arr[0]['Project Owner']}</td>
      <td>{arr[0]['SOC']}</td>
      <td>{arr[0]['Carbon credits']}</td>
      <td>{voted1 ? votes1 :
        <Button label="Vote" mode="strong" size="small" onClick={() => vote_click1(arr[0]['address'])}/>}</td>
    </tr>

    <tr>
      <th scope="row">{arr[1]['Offset project Type']}</th>
      <td>{arr[1]['Project Owner']}</td>
      <td>{arr[1]['SOC']}</td>
      <td>{arr[1]['Carbon credits']}</td>
      <td>{voted2 ? votes2 :
        <Button label="Vote" mode="strong" size="small" onClick={() => vote_click2(arr[1]['address'])}/>}</td>
    </tr>

    <tr>
      <th scope="row">{arr[2]['Offset project Type']}</th>
      <td>{arr[2]['Project Owner']}</td>
      <td>{arr[2]['SOC']}</td>
      <td>{arr[2]['Carbon credits']}</td>
      <td>{voted3 ? votes3 :
        <Button label="Vote" mode="strong" size="small" onClick={() => vote_click3(arr[2]['address'])}/>}</td>
    </tr>
  
  </tbody>
</table>
            
    </>
  )
}

export default Voting;
