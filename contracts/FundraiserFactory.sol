// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Fundraiser.sol';

contract FundraiserFactory {
  Fundraiser[] private _fundraisers;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

  function createFundraiser(
    string memory name,
    string memory description,
    string memory imageURL,
    string memory url,
    address payable beneficiary
  ) 
  public
  {
    Fundraiser fundraiser = new Fundraiser(name,description,imageURL,url,beneficiary,msg.sender);
    _fundraisers.push(fundraiser);
    emit FundraiserCreated(fundraiser, msg.sender);
  }

  function fundraisers() 
  public 
  view 
  returns(Fundraiser[] memory array_fundraisers)
  {
    return _fundraisers;
  }
}
