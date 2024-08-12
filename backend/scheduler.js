class PriorityQueue{
    constructor(){
        this.values = [];
    }
    enqueue(node, priority){
        var flag = false;
        for(let i=0; i<this.values.length; i++){
            if(this.values[i].priority>priority){
                this.values.splice(i, 0, {node, priority})
                flag = true;
                break;
            }
        }
        if(!flag){
            this.values.push({node, priority})
        }
    }
    dequeue(){
        return this.values.shift()
    }
    
    size(){
        return this.values.length;
    }
}
//write a arrow function to implement the scheduler
const assignReviewers = (tasks) => { 
    const reviewerLoads = {};
    const taskPriority = new PriorityQueue();
    
    
}


const tasks = [
    {
      taskId: 1,
      assigneeName: "John",
      reviewerName: null,
      status: "todo",
      estimateInHours: 4
    },
    {
      taskId: 2,
      assigneeName: "Jane",
      reviewerName: "John",
      status: "in-review",
      estimateInHours: 8
    },
    {
      taskId: 3,
      assigneeName: "Jim",
      reviewerName: null,
      status: "in-review",
      estimateInHours: 6
    }
  ];