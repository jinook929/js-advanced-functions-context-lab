/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = function (employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (employeesInfo) {
    return employeesInfo.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = function (time) {
    let [date, hour] = time.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const createTimeOutEvent = function (time) {
    let [date, hour] = time.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const hoursWorkedOnDate = function (date) {
    const timein = this.timeInEvents.find(timeIn => timeIn.date === date).hour
    const timeout = this.timeOutEvents.find(timeOut => timeOut.date === date).hour
    return (timeout - timein) / 100
}

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    
    return payable
}

const findEmployeeByFirstName = (employeesArr, name) => {
    return employeesArr.find(employee => employee.firstName === name)
}

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce((sum, employee) => sum + allWagesFor.call(employee), 0)
}
