// TOPOLOGICAL SORT USING DFS

oppia.factory('ReviewModeCardOrderingService', [
  'INTERACTION_SPECS', 'ComputeGraphService',
  function(INTERACTION_SPECS){
    var _tologicalOrderOfStates = function(initStateId, states, sourceStateName) {
      var stateGraph = ComputeGraphService.compute(initStateId, states);
      /* this will return object
       *    finalStateIds: finalStateIds,
       *    initStateId: initStateId,
       *    links: links,
       *    nodes: nodes
       */
      var States = ComputeGraphService.computeBfsTraversalOfStates(
        initStateId, states, sourceStateName);
      // used it to get list of states, also first state is the first card
      // DFS from the first card should reach every other card, because if the 
      // exploration is error-free, there should be a path to every card from 
      // the first card.
      var topoOrder = [];
      var stack = [];       
      var seen = {}; var done = {};
      stack.push(States[0]); seen[States[0]] = true;
      while(stack.length>0){
        var ele = stack[stack.length-1]; stack.pop();
        if(done.hasOwnProperty(ele)){
          topoOrder.push(ele);
        }
        else{
          stack.push(ele); done[ele] = true;
          stateGraph.links.forEach(link=>{
            if(link.source===ele && !seen.hasOwnProperty(link.target)){
              seen[link.target] = true; stack.push(link.target);
            }
          })
        }
      }
    }

    return {
      tologicalOrderOfStates: function(
          initStateId, states, sourceStateName) {
        return _tologicalOrderOfStates(
          initStateId, states, sourceStateName);
      }
    };
  }
]);

