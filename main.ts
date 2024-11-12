//% color="#00CC00" icon="\u2B88"
//% block="XGo Robot hond"
namespace CBurgXGo {

    xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)

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
        Whirl
    }

    //% block="perform the %movement"
    //% block.loc.nl="doe de %movement"
    export function perform(movement: Movement) {
        switch (movement) {
            case Movement.Swing:
                xgo.execution_action(xgo.action_enum.Play_pendulum)
                break;
            case Movement.Wave:
                xgo.execution_action(xgo.action_enum.Wave)
                break;
            case Movement.Roll:
                xgo.execution_action(xgo.action_enum.Twirl_Roll)
                break;
            case Movement.Whirl:
                xgo.execution_action(xgo.action_enum.Whirl)
                break;
        }
    }

    //% block="crawl forward"
    //% block.loc.nl="kruip vooruit"
    export function crawlForward() {
        xgo.execution_action(xgo.action_enum.Stretch_oneself)
    }

    //% block="stretch body"
    //% block.loc.nl="strek het lijf"
    export function stretchOneself() {
        xgo.execution_action(xgo.action_enum.Stretch_oneself)
    }

    //% block="squat"
    //% block.loc.nl="hurk"
    export function squat() {
        xgo.execution_action(xgo.action_enum.Squat)
    }

    //% block="sit down"
    //% block.loc.nl="zit"
    export function sitDown() {
        xgo.execution_action(xgo.action_enum.Sit_down)
    }

    //% block="go prone"
    //% block.loc.nl="ga liggen"
    export function goProne() {
        xgo.execution_action(xgo.action_enum.Go_prone)
    }

    //% block="stand up straight"
    //% block.loc.nl="sta rechtop"
    export function defaultPosture() {
        xgo.execution_action(xgo.action_enum.Default_posture)
    }
}