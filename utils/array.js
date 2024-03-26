var ArrayUtilities = function ArrayUtilities(){

  var self = this;

  this.addToSet = addToSet;

  function addToSet(set, newElement, fieldToMatch){
    var found = false;
    set.forEach(function(elem){
      if(Array.isArray(fieldToMatch)){
        var everyFieldMatches = 0;
        fieldToMatch.forEach(function(field){
          if(elem[field] === newElement[field]){
            everyFieldMatches++;
          }
        });
        if(everyFieldMatches >= fieldToMatch.length){
          found = true;
        }
      } else {
        if(elem[fieldToMatch] === newElement[fieldToMatch]){
          found = true;
        }
      }
    });
    if(!found){
      set.push(newElement);
    }
    return found;
  }

  if(ArrayUtilities.caller != ArrayUtilities.getInstance){
		throw new Error("This object cannot be instanciated");
	}

};


ArrayUtilities.instance = null;
ArrayUtilities.getInstance = function(){
	if(this.instance === null){
		this.instance = new ArrayUtilities();
	}
	return this.instance;
};

module.exports = ArrayUtilities.getInstance();
