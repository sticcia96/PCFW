----
title: API
----
[required]<br />
&lt;optional&gt;
## Events
Plug.dj Coding FrameWork contains an event manager, `PCFW.events`, that extends the original plug.dj API event system.<br />
All API events will also be emitted by PCFW.

Function | Description | Returns
--- | --- | ---
`PCFW.events.on([type],[callback],<priority>)` | Add a callback that will be executed on **every** emit of _type_<br />If no _priority_, `NORMAL` is used. | `true`/`false`
`PCFW.events.once([type],[callback],<priority>)` | Add a callback that will be executed only **once** on next emit of _type_.<br />If no _priority_, `NORMAL` is used. | `true`/`false`
`PCFW.events.off([type],[callback],<priority>)` | Remove a callback from a _type_ | `true`/`false`
`PCFW.events.emit([type],[data])` | Emit the event _type_ with _data_ | `true`/`false`

### Priority
To make the different scripts run in correct order, the event manager contains a priority.<br />
When writing priorities, please use either an integer or `PCFW.events.priority`.

Priority | Value
--- | ---
`PCFW.events.priority.HIGHEST` | 0
`PCFW.events.priority.HIGH` | 1
`PCFW.events.priority.NORMAL` | 2
`PCFW.events.priority.LOW` | 3
`PCFW.events.priority.LOWEST` | 4
