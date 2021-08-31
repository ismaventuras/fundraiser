// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Fundraiser is Ownable{
  /**
    * Guardamos el valor enviado(en ether/bnb) y la fecha de la donacion(el timestamp del bloque donde se ha minado la tx)
   */
  struct Donation{
    uint256 value;
    uint256 date;
  }
  // asociamos cada wallet a una array de donaciones, asi cada wallet puede hacer mas de una donacion en la misma recaudacion de fondos
  mapping(address => Donation[]) private _donations;

  // eventos para la donacion, un evento cuando se recive una donacion y un evento cuando el due;o extrae los fondos 
  event DonationReceived(address indexed donor, uint256 value);
  event Withdraw(uint256 amount);

  string public name; // nombre para la recaudacion
  string public description; // descripcion para la recaudacion
  string public imageURL; // imagen para la recaudacion
  string public url; // descripcion para la recaudacion
  address payable public beneficiary; // direccion del beneficiario

  uint256 public totalDonations; // total en wei del ether que se ha donado
  uint256 public donationsCount; // donaciones totales, para llevar la cuenta de cuantas donaciones se han hecho en total

  constructor(
    string memory _name,
    string memory _description,
    string memory _imageURL,
    string memory _url,
    address payable _beneficiary,
    address _owner
  )  
  {
    name=_name;
    description=_description;
    url=_url;
    imageURL=_imageURL;
    beneficiary=_beneficiary;
    transferOwnership(_owner);
  }

  // Si alguien envia ether de forma anonima (es decir sin pasar por el proceso de donacion) hay que manejarlo como una donacion mas.
  receive() external payable{
    totalDonations = totalDonations + msg.value;
    donationsCount++;
  }

  /**
    funcion para donar, creamos una donacion en memoria y la a;adimos al array de donaciones de la wallet, luego sumamos el ether que ha enviado al total en wei(totalDonations),
    aumentamos el contador de donaciones totales y emitimos el evento DonationReceived
   */
  function donate() 
  public 
  payable
  {
    Donation memory donation = Donation({
      value: msg.value,
      date: block.timestamp
    });
    _donations[msg.sender].push(donation);
    totalDonations = totalDonations + msg.value;
    donationsCount++;

    emit DonationReceived(msg.sender, msg.value);
  }
  
  /**
    Funcion para sacar los ether, se saca el balance total del contrato y se envia a la direccion del beneficiario
   */
  function withdraw() 
  public 
  onlyOwner
  {
    uint256 balance = address(this).balance;
    beneficiary.transfer(balance);

    emit Withdraw(balance);
  }

  /**setters */
  function setBeneficiary(address payable _beneficiary) public onlyOwner{beneficiary = _beneficiary;}
  function setName(string calldata _name) external onlyOwner{name=_name;}
  function setUrl(string calldata _url) external onlyOwner{url=_url;}
  function setImageUrl(string calldata _imageURL) external onlyOwner{imageURL=_imageURL;}
  function setDescription(string calldata _description) external onlyOwner{description=_description;}
  /**Getters */
  function getTotalDonationsUser() public view returns(uint256){return _donations[msg.sender].length;}

}
