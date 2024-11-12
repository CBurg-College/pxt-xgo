//% color="#00CC00" icon="\u2B88"
//% block="XGo Robot hond"
namespace CBurgXGo {

    let MASTER: boolean = false

    enum Message {
        Stand,
        Prone,
        Sit,
        Pee,
        Swing,
        Wave,
        Roll,
        Whirl,
        Crawl,
        Stretch,
        Squat
    }

    xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)

    radio.setGroup(1)

    radio.onReceivedNumber(function (receivedNumber: number) {
        switch (receivedNumber) {
            case Message.Stand: defaultPosture(); break;
            case Message.Prone: goProne(); break;
            case Message.Sit: sitDown(); break;
            case Message.Pee: pee(); break;
            case Message.Swing: perform(Movement.Swing); break;
            case Message.Wave: perform(Movement.Wave); break;
            case Message.Roll: perform(Movement.Roll); break;
            case Message.Whirl: perform(Movement.Whirl); break;
            case Message.Crawl: perform(Movement.Crawl); break;
            case Message.Stretch: perform(Movement.Stretch); break;
            case Message.Squat: perform(Movement.Squat); break;
        }
    })

    export enum Movement {
        //% block="swing"
        //% block.loc.nl="swing"
        Swing,
        //% block="wave"
        //% block.loc.nl="wave"
        Wave,
        //% block="roll"
        //% block.loc.nl="rol"
        Roll,
        //% block="whirl"
        //% block.loc.nl="werveling"
        Whirl,
        //% block="crawl"
        //% block.loc.nl="besluiping"
        Crawl,
        //% block="stretch"
        //% block.loc.nl="stretch"
        Stretch,
        //% block="squat"
        //% block.loc.nl="hurking"
        Squat
    }

    //% block="wait %time sec"
    //% block.loc.nl="wacht %time sec"
    export function wait(time: number) {
        basic.pause(time * 1000);
    }

    //% block="wait for button A being pressed"
    //% block.loc.nl="wacht tot knop A is ingedrukt"
    export function waitButton() {
        while (!input.buttonIsPressed(Button.A));
    }

    //% block="follow the leader"
    //% block.loc.nl="volg de leider"
    export function doClient() {
    }

    //% block="be the leader"
    //% block.loc.nl="wees de leider"
    export function setMaster() {
        MASTER = true
    }

    //% block="perform the %movement"
    //% block.loc.nl="doe de %movement"
    export function perform(movement: Movement) {
        switch (movement) {
            case Movement.Swing:
                if (MASTER) radio.sendNumber(Message.Swing)
                xgo.execution_action(xgo.action_enum.Play_pendulum)
                break;
            case Movement.Wave:
                if (MASTER) radio.sendNumber(Message.Wave)
                xgo.execution_action(xgo.action_enum.Wave)
                break;
            case Movement.Roll:
                if (MASTER) radio.sendNumber(Message.Roll)
                xgo.execution_action(xgo.action_enum.Twirl_Roll)
                break;
            case Movement.Whirl:
                if (MASTER) radio.sendNumber(Message.Whirl)
                xgo.execution_action(xgo.action_enum.Whirl)
                break;
            case Movement.Crawl:
                if (MASTER) radio.sendNumber(Message.Crawl)
                xgo.execution_action(xgo.action_enum.Crawl_forward)
                break;
            case Movement.Stretch:
                if (MASTER) radio.sendNumber(Message.Stretch)
                xgo.execution_action(xgo.action_enum.Stretch_oneself)
                break;
            case Movement.Squat:
                if (MASTER) radio.sendNumber(Message.Squat)
                xgo.execution_action(xgo.action_enum.Squat)
                break;
        }
    }

    //% block="pee"
    //% block.loc.nl="plas"
    export function pee() {
        if (MASTER) radio.sendNumber(Message.Pee)
        xgo.execution_action(xgo.action_enum.Pee)
    }

    //% block="sit down"
    //% block.loc.nl="zit"
    export function sitDown() {
        if (MASTER) radio.sendNumber(Message.Sit)
        xgo.execution_action(xgo.action_enum.Sit_down)
    }

    //% block="go prone"
    //% block.loc.nl="ga liggen"
    export function goProne() {
        if (MASTER) radio.sendNumber(Message.Prone)
        xgo.execution_action(xgo.action_enum.Go_prone)
    }

    //% block="stand up straight"
    //% block.loc.nl="sta rechtop"
    export function defaultPosture() {
        if (MASTER) radio.sendNumber(Message.Stand)
        xgo.execution_action(xgo.action_enum.Default_posture)
    }
}
