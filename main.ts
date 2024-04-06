huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
DFRobotMaqueenPlus.I2CInit()
let vitesse = 40
let allumage = 0
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(5, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        allumage = 1
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.GREEN)
    }
    if (input.buttonIsPressed(Button.A) && !(input.isGesture(Gesture.ScreenUp))) {
        allumage = 1
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.GREEN)
    }
    while (allumage == 1) {
        huskylens.request()
        if (vitesse == 40 || (vitesse == 80 || (vitesse == 120 || (vitesse == 160 || (vitesse == 200 || vitesse == 240))))) {
            DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.BLUE)
        }
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            vitesse = 85
            DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.GREEN)
        }
        if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            vitesse = 170
            DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.YELLOW)
        }
        if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            vitesse = 255
            DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.RED)
        }
        if (huskylens.isAppear(4, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            allumage = 2
        }
        if (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 0 && DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 0) {
            DFRobotMaqueenPlus.mototStop(Motors.ALL)
        } else {
            if (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 1 && DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 1) {
                DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, vitesse)
            }
            if (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 0 && DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 1) {
                DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, vitesse)
                DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, vitesse)
            }
            if (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 1 && DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 0) {
                DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, vitesse)
                DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, vitesse)
            }
        }
        if (input.buttonIsPressed(Button.B)) {
            allumage = 2
        }
        basic.pause(10)
    }
    if (allumage == 2) {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.OFF)
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        allumage = 0
    }
    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.RED)
    if (input.isGesture(Gesture.ScreenUp)) {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.PINK)
        if (vitesse < 240 && input.buttonIsPressed(Button.B)) {
            vitesse = vitesse + 40
            basic.showNumber(vitesse)
        }
        if (vitesse > 40 && input.buttonIsPressed(Button.A)) {
            vitesse = vitesse - 40
            basic.showNumber(vitesse)
        }
    } else {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.OFF)
    }
    basic.pause(10)
})
