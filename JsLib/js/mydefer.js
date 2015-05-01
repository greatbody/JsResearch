/**
 *
 * @authors sunsoft (sunruiyeyipeng@163.com)
 * @date    2015-04-30 22:26:22
 * @version v1.0
 */
function Executor() {
    return {
        oSequence: [],
        Params: {},
        microInterval: 10,
        add: function(func, delay) {
            var that = this;
            var option = {
                delayInit: delay,
                startDateTime: null,
                state: "wait",
                delegateFunc: func,
                done: function() {
                    this.state = "done";
                },
                getParam: function(paramname) {
                    return that.Params[paramname];
                },
                setParam: function(paramname, value) {
                    that.Params[paramname] = value;
                }
            };
            this.oSequence.push(option);
        },
        exec: function() {
            this.oSequence.reverse();
            var that = this;
            //active the first one
            this.oSequence[that.oSequence.length - 1].startDateTime = new Date();
            var fTmp = function() {
                if (that.oSequence.length > 0) {
                    var oTask = that.oSequence[that.oSequence.length - 1];
                    if (oTask.state == "done") {
                        //如果任务已经完成，就删除这个节点
                        that.oSequence.pop();
                        //如果还有下一个节点，则将它的开始时间设置好
                        if (that.oSequence.length > 0) {
                            oTask = that.oSequence[that.oSequence.length - 1];
                            oTask.startDateTime = new Date();
                        }
                    }
                    if (oTask.state == "wait" && oTask.startDateTime != null && (new Date()) - oTask.startDateTime > oTask.delayInit) {
                        oTask.state = "processing";
                        oTask.delegateFunc(oTask);
                    }
                    setTimeout(fTmp, that.microInterval);
                } else {
                    console.log("done");
                }
            }
            fTmp();
        },
        sleep: function(millSec) {
            this.add(function(task) {
                task.done();
            }, millSec);
        }
    };
}