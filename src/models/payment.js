export default class Payment {
    constructor(uuid, checkingAccountUUID, paymentAmount, paymentType) {
        this.uuid = uuid
        this.checkingAccountUUID = checkingAccountUUID
        this.paymentAmount = paymentAmount
        this.paymentType = paymentType

    }
}