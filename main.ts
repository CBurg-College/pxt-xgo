//% color="#00CC00" icon="\u2B88"
//% block="XGo Robot hond"
namespace CBurgXGo {

    let GROUP: number = 1
    let MASTER: boolean = false
    let CLIENT: number = 0
    let WAIT: number = 0

    enum Message {
        Start,
        FastWave,
        NormalWave,
        SlowWave,
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

    xgo.init_xgo_serial(SerialPin.P14, SerialPin.P13)

    radio.onReceivedNumber(function (receivedNumber: number) {
        basic.showNumber(receivedNumber)
        if (WAIT) basic.pause(WAIT)
        WAIT = 0
        switch (receivedNumber) {
            case Message.Start: basic.clearScreen(); break;
            case Message.FastWave: WAIT = CLIENT * 0.2; break;
            case Message.NormalWave: WAIT = CLIENT * 0.6; break;
            case Message.SlowWave: WAIT = CLIENT * 0.8; break;
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

    export enum Group {
        //% block="group 1"
        //% block.loc.nl="groep 1"
        Group1,
        //% block="group 2"
        //% block.loc.nl="groep 2"
        Group2,
        //% block="group 3"
        //% block.loc.nl="groep 3"
        Group3,
        //% block="group 4"
        //% block.loc.nl="groep 4"
        Group4,
        //% block="group 5"
        //% block.loc.nl="groep 5"
        Group5,
        //% block="group 6"
        //% block.loc.nl="groep 6"
        Group6,
        //% block="group 7"
        //% block.loc.nl="groep 7"
        Group7,
        //% block="group 8"
        //% block.loc.nl="groep 8"
        Group8,
        //% block="group 9"
        //% block.loc.nl="groep 9"
        Group9
    }

    export enum Position {
        //% block="position 1"
        //% block.loc.nl="positie 1"
        Position1,
        //% block="position 2"
        //% block.loc.nl="positie 2"
        Position2,
        //% block="position 3"
        //% block.loc.nl="positie 3"
        Position3,
        //% block="position 4"
        //% block.loc.nl="positie 4"
        Position4,
        //% block="position 5"
        //% block.loc.nl="positie 5"
        Position5,
        //% block="position 6"
        //% block.loc.nl="positie 6"
        Position6,
        //% block="position 7"
        //% block.loc.nl="positie 7"
        Position7,
        //% block="position 8"
        //% block.loc.nl="positie 8"
        Position8,
        //% block="position 9"
        //% block.loc.nl="positie 9"
        Position9
    }

    export enum Wave {

        //% block="slow"
        //% block.loc.nl="langzame"
        Slow,
        //% block="normal"
        //% block.loc.nl="gewone"
        Normal,
        //% block="fast"
        //% block.loc.nl="snelle"
        Fast
    }

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

    //% block="join %group"
    //% block.loc.nl="sluit aan bij %group"
    export function setGroup(group: Group) {
        GROUP = group + 1
    }

    //% block="follow the leader at %pos"
    //% block.loc.nl="volg de leider op %pos"
    export function doClient(pos: Position) {
        radio.setGroup(GROUP)
        CLIENT = pos + 1
        basic.showNumber(CLIENT)
    }

    //% block="be the leader"
    //% block.loc.nl="wees de leider"
    export function setMaster() {
        radio.setGroup(GROUP)
        MASTER = true
        basic.showString("A")
        while (!input.buttonIsPressed(Button.A));
        basic.clearScreen()
        radio.sendNumber(Message.Start)
        basic.showNumber(Message.Start)
    }

    //% block="do a %wave wave"
    //% block.loc.nl="maak een %wave wave"
    export function setWave(wave: Wave) {
        switch (wave) {
            case Wave.Slow:
                if (MASTER) radio.sendNumber(Message.SlowWave)
                basic.showNumber(Message.SlowWave)
                break;
            case Wave.Normal:
                if (MASTER) radio.sendNumber(Message.NormalWave)
                basic.showNumber(Message.NormalWave)
                break;
            case Wave.Fast:
                if (MASTER) radio.sendNumber(Message.FastWave)
                basic.showNumber(Message.FastWave)
                break;
        }
    }

    //% block="perform the %movement"
    //% block.loc.nl="doe de %movement"
    export function perform(movement: Movement) {
        switch (movement) {
            case Movement.Swing:
                if (MASTER) radio.sendNumber(Message.Swing)
                basic.showNumber(Message.Swing)
                xgo.execution_action(xgo.action_enum.Play_pendulum)
                break;
            case Movement.Wave:
                if (MASTER) radio.sendNumber(Message.Wave)
                basic.showNumber(Message.Wave)
                xgo.execution_action(xgo.action_enum.Wave)
                break;
            case Movement.Roll:
                if (MASTER) radio.sendNumber(Message.Roll)
                basic.showNumber(Message.Roll)
                xgo.execution_action(xgo.action_enum.Twirl_Roll)
                break;
            case Movement.Whirl:
                if (MASTER) radio.sendNumber(Message.Whirl)
                basic.showNumber(Message.Whirl)
                xgo.execution_action(xgo.action_enum.Whirl)
                break;
            case Movement.Crawl:
                if (MASTER) radio.sendNumber(Message.Crawl)
                basic.showNumber(Message.Crawl)
                xgo.execution_action(xgo.action_enum.Crawl_forward)
                break;
            case Movement.Stretch:
                if (MASTER) radio.sendNumber(Message.Stretch)
                basic.showNumber(Message.Stretch)
                xgo.execution_action(xgo.action_enum.Stretch_oneself)
                break;
            case Movement.Squat:
                if (MASTER) radio.sendNumber(Message.Squat)
                basic.showNumber(Message.Squat)
                xgo.execution_action(xgo.action_enum.Squat)
                break;
        }
    }

    //% block="pee"
    //% block.loc.nl="plas"
    export function pee() {
        if (MASTER) radio.sendNumber(Message.Pee)
        basic.showNumber(Message.Pee)
        xgo.execution_action(xgo.action_enum.Pee)
    }

    //% block="sit down"
    //% block.loc.nl="zit"
    export function sitDown() {
        if (MASTER) radio.sendNumber(Message.Sit)
        basic.showNumber(Message.Sit)
        xgo.execution_action(xgo.action_enum.Sit_down)
    }

    //% block="go prone"
    //% block.loc.nl="ga liggen"
    export function goProne() {
        if (MASTER) radio.sendNumber(Message.Prone)
        basic.showNumber(Message.Prone)
        xgo.execution_action(xgo.action_enum.Go_prone)
    }

    //% block="stand up straight"
    //% block.loc.nl="sta rechtop"
    export function defaultPosture() {
        if (MASTER) radio.sendNumber(Message.Stand)
        basic.showNumber(Message.Stand)
        xgo.execution_action(xgo.action_enum.Default_posture)
    }
}
