var validatorUtilities = require('./validator');

var ChainUtilities = function ChainUtilities(){

  var self = this;

  this.isValidChain = isValidChain;

  function isValidChain(chain){
    if(chain.length>0){
      for (var i = 1; i < chain.length; i++) {
        var lastBlockHash = calculateHash(chain[i-1]);
        if(lastBlockHash !== chain[i].previousHash){
          return false;
        }
        if(validatorUtilities.generateProof(chain[i]) !== chain[i].proof){
          return false;
        }
      }
    }
    return true;
  }

  if(ChainUtilities.caller != ChainUtilities.getInstance){
		throw new Error("This object cannot be instanciated");
	}

};


ChainUtilities.instance = null;
ChainUtilities.getInstance = function(){
	if(this.instance === null){
		this.instance = new ChainUtilities();
	}
	return this.instance;
};

module.exports = ChainUtilities.getInstance();
