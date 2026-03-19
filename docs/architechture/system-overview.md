# Module Dependencies
## Frontend
### Environment
__Grid__
Imports from: Node[]
Exports to: EnvironmentPage, RunPage

__Node__
Exports to: Grid

__Toolbar__
Imports from: Icon[]
Exports to: EnvironmentPage, RunPage

__Icon__
Exports to: Toolbar

### Pages
__LandingPage__
Imports from: Logo, Button[]

__EnvironmentPage__
Imports from: Toolbar, Grid, Button[]

__ConfigPage__
Imports from: Button[]

__RunPage__
Imports from: Toolbar, Grid
Exports to: Controller

### Page Elements
__Button__
Exports to: LandingPage, EnvironmentPage, ConfigPage, RunPage

__Logo__
Exports to: LandingPage

__SettingsList__
Imports from: Setting[]
Exports to: EnvironmentPage, ConfigPage

__Setting__
Exports to: SettingsList

### Control
__Controller__
Imports from: RunPage, MessageHandler

__StepQueue__
Imports from: MessageHandler
Exports to: SocketClient

### Socket

__MessageHandler__
Exports to: Controller, StepQueue

__SocketClient__
Imports from: Node[]
Exports to: EnvironmentPage, RunPage