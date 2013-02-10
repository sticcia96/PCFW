---
# API
[required]<br />
&lt;optional&gt;

## <a href="#Commands" name="Commands">Commands</a>
PCFW gives you the ability to add commands.

Function | Description | Returns
--- | --- | ---
`PCFW.commands.add([command],[callback])` | Add a command that will call _callback_ | `true`/`false`
`PCFW.commands.remove([command])` | Remove a command | `true`/`false`

## <a href="#Events" name="Events">Events</a>
Plug.dj Coding FrameWork contains an event manager, `PCFW.events`, that extends the original plug.dj API event system.<br />
All API events will also be emitted by PCFW, simply replace `API.addEventListener` and `API.removeEventListener` with `PCFW.events.on` and `PCFW.events.off`.

Function | Description | Returns
--- | --- | ---
`PCFW.events.on([type],[callback],<priority>)` | Add a callback that will be executed on **every** emit of _type_<br />If no <a href="#Priority">_priority_</a>, `NORMAL` is used. | `true`/`false`
`PCFW.events.once([type],[callback],<priority>)` | Add a callback that will be executed only **once** on next emit of _type_.<br />If no <a href="#Priority">_priority_</a>, `NORMAL` is used. | `true`/`false`
`PCFW.events.off([type],[callback])` | Remove a callback from a _type_ | `true`/`false`
`PCFW.events.emit([type],[data])` | Emit the event _type_ with _data_ | `true`/`false`

### <a href="#Priority" name="Priority">Priority</a>
To make the different scripts run in correct order, the event manager contains a priority.<br />
When writing priorities, please use either an integer or `PCFW.events.priority`.<br />
Events with highest priority gets run first (HIGHEST to LOWEST, 0 to 4).

Priority | Value
--- | ---
`PCFW.events.priority.HIGHEST` | 0
`PCFW.events.priority.HIGH` | 1
`PCFW.events.priority.NORMAL` | 2
`PCFW.events.priority.LOW` | 3
`PCFW.events.priority.LOWEST` | 4