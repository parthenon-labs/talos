[TOC]



# Python青少年游戏编程



# 介绍



# 入门

## 1. 函数入门

#### 函数执行

**目标**：使用函数让 Byte 动起来，去收集金币

你的角色 Byte 喜欢收集金币，但是他一个人做不到，第一关里你需要通过拖拽积木或编写 Python 代码，让 Byte 在关卡世界中动起来，去收集金币。

1. 找到关卡世界中的金币，并收集起来
2. 通过`moveForward`、`collectCoin`积木或者Python函数去前进收集金币
3. 点击场景下方“运行”按钮

```python
from role import moveForward, collectCoin

moveForward()
moveForward()
collectCoin()

```





#### 其他内置函数

**目标**：把移动和转弯函数结合起来，去收集金币

这一关和上一关类似，但这次Byte需要左转才能到达宝石处，我们需要用到新的函数`turnLeft`让角色可以左转去收集金币。

1. 构思能让Byte收集到金币的方式
2. 使用`turnLeft`让Byte可以左转
3. 运行代码

```python
from role import moveForward, turnLeft, collectCoin


moveForward()
moveForward()
collectCoin()
moveForward()
moveForward()
turnLeft()
moveForward()
collectCoin()


```







#### 组合新的行为

**目标**：使用命令组合实现Byte的右转

你是否注意到，目前还没有`turnRight`函数，如果角色需要通过右转才能到达金币处，该怎么办呢？

有时候为了解决类似的编程问题，我们可以组合现有函数来创建新的行为，这个过程可以称为**组合**。

1. 想一想这么菜能通过之前的命令实现右转呢
2. 使用组合的方式让角色在需要时右转
3. 收集金币并运行代码

```python
from role import moveForward, turnLeft, turnRight, collectCoin, isCoin, isBlocked, isRightBlocked

moveForward()
moveForward()
moveForward()
collectCoin()
turnLeft()
turnLeft()
turnLeft()
moveForward()
moveForward()
collectCoin()
moveForward()
turnLeft()
moveForward()
collectCoin()

```





#### 创建新函数

**目标**：定义并使用`turnRight`函数来实现右转

在上一关中，你只右转了一次，所以使用三次左转不是大问题，但是如果你需要右转不止一次呢？更高效的方式是三次左转的动作定义成一个新的`turnRight`函数，这样多次运行起来就很方便。

1. 定义`turnRight`函数
2. 输入三个`turnLeft`函数
3. 使用`turnRight`函数实现角色的右转

```python
from role import moveForward, turnLeft, collectCoin

def turnRight():
  turnLeft()
  turnLeft()
  turnLeft()


moveForward()
moveForward()
moveForward()
collectCoin()
moveForward()
turnRight()
moveForward()
moveForward()
collectCoin()
moveForward()
moveForward()
turnRight()
moveForward()
moveForward()
moveForward()
collectCoin()
```





## 2.For循环

#### 使用for循环

**目标**：使用`for`循环重复的代码。

之前为了分解编程任务，你编写了用于重复模式的函数，现在你可以使用循环，多次调用一个函数。在一个循环中，写一次代码并输入代码重复的次数。

在这一关中我们使用`for`循环去简化之前重复了多次的`moveForward`函数，从而实现前进多步的功能。

1. 使用for循环
1. 确认循环重复次数
1. 编写要重复的语句



```python
from role import moveForward, collectCoin

for i in range(5):
  moveForward()

collectCoin()
```



#### 嵌套循环

**目标**：使用嵌套`for`循环重复命令。

在上一关中你使用for循环将一个命令重复多次，这一关将会使用2层的嵌套循环，最外层循环正方形的每一条边，内侧的循环，循环执行`moveForward`

1. 使用嵌套循环
2. 循环路的每一侧
3. 使用循环前进指定的次数



```python
from role import moveForward, turnRight, collectCoin


for i in range(4):
  moveForward()
  collectCoin()
  for i in range(4):
    moveForward()
  turnRight()
```





#### 函数与循环

**目标**：将多个步骤分解成函数和循环

这一关中我们可以发现，两条有金币的路上，他们的金币的位置是相同的，我们可以把相同动作抽离成函数，来减少重复的代码

1. 将相同的动作抽离成函数
2. 使用for循环减少重复的命令



```python
from role import moveForward, turnRight, collectCoin


def moveTwice():
  for i in range(2):
    moveForward()

def collect():
  moveForward()
  collectCoin()
  moveTwice()
  collectCoin()
  moveTwice()


collect()
turnRight()
for i in range(3):
  moveForward()
turnRight()
collect()
```





## 3.条件判断

#### 使用if语句

**目标**：使用`if`语句哦按段当前位置是否有金币

在这一关中，我们可以使用更简化的方式在有金币的时候自动收集金币。

使用`isCoin`判断角色当前位置是否有金币，返回`bool`类型，有金币则`True`否则`False`。并且使用`if`检查，当条件语句中的条件为`True`的时候才会执行`if`中的语句否则不执行。

1. 使用`if`判断角色当前位置是否有金币
2. 使用`isCoin`变量



```python
from role import moveForward, turnLeft, turnRight, collectCoin, isCoin

def moveCollect():
  moveForward()
  if isCoin:
    collectCoin()

moveCollect()
turnRight()
moveCollect()
turnLeft()
moveCollect()
turnRight()
moveCollect()
moveCollect()
turnLeft()
moveCollect()
```



#### 使用else语句

**目标**：使用`else`语句，当条件为`False`时执行需要的代码

上一关使用`if`条件语句当条件为`True`的时候才会执行需要的代码。这一关我们使用`else`当条件为`False`时执行需要的代码

1. 使用`else`语句
2. 当角色可前进时执行`moveForward`,否则右转

```python
from role import moveForward, turnRight, collectCoin, isBlocked

def moveTurn():
  if isBlocked:
    turnRight()
  else:
    moveForward()


for i in range(2):
  for i in range(4):
    moveTurn()
  collectCoin()

```





#### 如何使用elif语句

**目标**：使用`elif`语句

上面的关卡中为了确认角色当前位置是否有金币，使用`if`来检查其中一种可能性，这一关我们使用`elif`来检查另一种可能性。

1. 使用`if`检查道路是否被阻止
2. 使用`elif`检查角色所在位置是否有金币
3. 以上条件都没满足时执行`moveForward`



```python
from role import moveForward, turnLeft, turnRight, collectCoin, isCoin, isBlocked

def action():
  if isBlocked:
    turnLeft()
  elif isCoin:
    collectCoin()
  else:
    moveForward()

action()
action()
action()
action()
```



#### 循环条件语句

**目标**：使用`for`循环与`if` `elif` `else`结合收集金币



```python
from role import moveForward, turnLeft, collectCoin, isCoin, isBlocked


for i in range(16):
  if isBlocked:
    turnLeft()
  elif isCoin:
    collectCoin()
  else:
    moveForward()

```



## 4.逻辑运算符

#### 使用“非”运算符

**目标**：使用`not`运算符

“非”运算符`not`反转布尔值，表示“如果不满足这个条件则不这么做”。

使用`not`运算符，当左侧道路不阻塞的时候前进并拾取左侧道路内的金币，否则向前走拾取金币。

1. 使用`if` `else`条件语句
2. 使用`not`运算符

```python
from role import moveForward, turnLeft, turnRight, collectCoin, isBlocked

moveForward()
for i in range(4):
  turnLeft()
  if not isBlocked:
    moveForward()
    collectCoin()
    turnRight()
    turnRight()
    moveForward()
    turnLeft()
    moveForward()
  else:
    turnRight()
    collectCoin()
    moveForward()


```



#### 非之螺旋

**目标**：练习`not`运算符

使用`not`运算符判断前方道路不阻塞时，执行前进，否则右转。

```python
from role import moveForward, turnRight, collectCoin, isBlocked

for i in range(27):
  if not isBlocked:
    moveForward()
  else:
    turnRight()

collectCoin()
```







#### 使用“与”运算符

**目标**：使用`and`运算符

“与”运算符`and`结合两个条件，且进二者均为`真`时运行代码。

使用`and`运算符，判断`isCoin`与`isRightBlocked`（右侧道路是否阻塞）条件都满足时执行收集金币，否则收集右侧道路中的金币

```python
from role import moveForward, turnRight, collectCoin, isCoin, isRightBlocked


for i in range(6):
  moveForward()
  if isCoin and isRightBlocked:
    collectCoin()
  else:
    turnRight()
    moveForward()
    collectCoin()
    turnRight()
    turnRight()
    moveForward()
    turnRight()

```



#### 使用“或”运算符

**目标**：使用`or`运算符

“或”运算符`or`结合两个条件，且至少有一个为`真`是运行代码。

使用`or`运算符，判断`isBlocked`或`isRightBlocked`满足条件时执行左转，否则向前移到。



```python
from role import moveForward, turnLeft, collectCoin, isBlocked, isRightBlocked

for i in range(6):
  if isBlocked or isRightBlocked:
    turnLeft()
    moveForward()
  else:
  	moveForward()

collectCoin()
```







# 进阶

## 5.While循环

#### 使用while循环

**目标**：使用`while`循环，当所在位置的金币被拾取时继续向前移动。

在这一关中有一排金币，希望角色当前位置有金币的时候拾取金币并向前移动，就像`if`语句一样,`while`循环运行你觉得在何时运行你的代码。`while`循环在`布尔`条件为`真`的情况才下才会持续运行代码。当条件为`假`时，`while`循环停止运行。

1. 为你的`while`循环选区一个布尔条件来确定何时运行
2. 在`while`块中添加命令来拾取所有金币

```python
from role import isCoin, collectCoin, moveForward
while isCoin:
  collectCoin()
  moveForward()
```





#### while循环与条件语句

**目标**：使用`while`循环和`if`语句收集所有金币。

现在尝试使用条件语句，使你的`while`循环更加智能。

1. 为`while`循环选择一个条件，满足时执行需要的代码
2. 使用`if`语句判断当前角色所在位置是否有金币，有金币则收集



```python
from role import isCoin, collectCoin, moveForward, isBlocked

while not isBlocked:
  moveForward()
  if isCoin:
    collectCoin()

```



#### 嵌套循环

**目标**：使用嵌套`while`与`not`运算符

在这一关中，注意金币构成的螺旋，每个转折点处有一个金币。若要通关，你需要在一个循环中嵌套另一个循环，被担心，这没有听起来的那么难！

在写代码之前，请构思清楚。在螺旅的第一条边，必须向前走，直至有金币可以收集。收策金币后，向左转，准备开始走完螺度的下一条边。这个模式一直重复，直至到达螺施内部最远的点，且被阳挡。

在编写使用嵌套循环的代码时，你需要逆向思考。你为本关编写的第一个猜环代表的是上述逻辑的最后一部分，即“重复直至受阻”部分。

1. 向`外循环`添加一个条件，以在角色受阻前一直重复`内循环`。
2. 调整`内循环`，使角色在有金币可收集前一直向前走。
3. 一旦角色遇到金币，则收集金币并左转。



```python
from role import isCoin, collectCoin, moveForward, isBlocked, turnRight

while not isBlocked:
  while not isCoin:
    moveForward()
  collectCoin()
  turnRight()
```





## 6.函数进阶

#### 函数的参数

**目标**：编写一个前进特定步数的函数。

在这一关中，通过创建一个新的函数，你可以使用单个命令走过多个砖块，从而减少代码的重复。你将使用`参数`为函数指定一个输入`distance`(距离)，你调用函数是将为`distance`(距离)传入一个值，或`实参`。例如，在`move(6)`，（移动6步）中`6`为实参。

下方提供了 `move(移动)` 的西数声明，其中包括参数`distance`。使用函数中的`distance`值来指定运行 `moveForward()`的次数。当你调用`move` 时，就会传入`distance `的`实参`来运行`moveForvard()`相应次数。

1. 完成函数定义，即在调用`moveForward（）`给定次数的循环中使用`distance`参数。
2. 如果使用`for循环`，则将`distance`设置成循环运行的次数。示例：`for i in range(distance):`。
3. 使用`move`函数完成本关。



```python
from role import moveForward, turnRight, collectCoin

def move(distance): # 向前移动指定距离
  for i in range(distance):
    moveForward()
    
move(3)
turnRight()
move(2)
collectCoin()
```



#### 函数的默认参数

**目标**：编写一个有默认参数的函数。

上一关你学会了如何创建一个前进指定步数的函数。这一关我们继续完善`move`这个函数，为它添加一个默认参数，当执行`move()`函数时，可以不传递参数，当不传递参数时，向前走一步。

1. 为`move`函数添加默认参数
1. 当`move`函数执行时没有传递参数的时候，向前移动一步

```python
def move(distance = 1): # 默认向前移动一步
  for i in range(distance):
    moveForward()
    
move()
```





#### 将角色放置特定位置

**目标**：将角色放置在特定的位置并且通关。

到目前位置，角色的起点以为你选好了。在这一关中，你将通过`实参`传入到成为`place`（位置）的方法中来选区起点。

1. 使用`place`方法 place有两个参数: `place(x, z)`。
2. 点击关卡世界中的一个砖块来显示其坐标。
3. 查看地图，为角色寻找一个起点位置。在`place`方法中使用该位置的坐标系值。



```python
from role import place

place(1, 1) # 角色，x，z
```





## 7.变量

#### 使用变量

**目标**：创建一个变量来跟踪收集的金币的数量。

在这一关中，你需要记录收集金币的数量。这个值一开始是0；在角色手机金币后值为1。

若要声明（创建）一个变量，需要定义`变量名`，然后使用`赋值运算符(=)`来设定变量的初始值。

**示例：**`myAge = 13`

声明新的变量后，你可以随时给他`赋予`新值：

**示例：**`myAge = 14`

1. 声明一个叫`coinCounter`（金币计数器）的变量，并初始化值为`0`。
2. 走到宝石处并收集金币。
3. 将`coinCounter`的值设为`1`



```python
from role import collectCoin, moveForward

coinCounter = 0
moveForward()
moveForward()
collectCoin()
coinCounter = 1
```



#### 使值增大

**目标**：每收集一个金币就为`coinCounter`赋予一个新的值。

你已经创建了一个`变量`并更改其值。在这一关中，你将练习该技能，在收集更多金币时争取设定变量的值。

赋予`coinCounter`初始值`0`。让你的角色走到每个金币处并收集金币。然后针对新手机的每个金币为`coinCounter`赋予正确的值。

```python
coinCounter = 0
for i in range(5):
	moveForward()
  collectGem()
  coinCounter = i + 1

```



#### 使值递增

**目标**：递增变量来跟进已收集金币的数量。

在上一关中，如果你不知道关卡中宝石的数量，则不能设定`1`、`2`、`3`这样的确切的值。你需要相对其当前值来增加`变量`的值。这种编程模式成为递增值。

```python
myAge = 13
myAge = myAge + 1
```

这一关我们需要检查每一个砖块，当遇到金币的时候自动拾取并且将`coinCounter`的值递增`1`。

1. 赋予`coinCounter`初识值`0`。
2. 编写在每个砖块上检查金币的代码。
3. 只要有金币，则收集并将`coinCounter`的值递增`1`。



```python
from role import isCoin, collectCoin, moveForward, isBlocked, turnRight

coinCounter = 0

for i in range(11):
  moveForward()
  if isCoin:
    collectCoin()
    coinCounter = coinCounter + 1
  if isBlocked:
    turnRight()
    
```



#### `+=`运算符

**目标**：使用`+=`运算符完成递增操作。

1. 使用递增运算符`+=`。
2. 收集金币后，使`coinCounter`值递增。

```python
from role import isCoin, collectCoin, moveForward, isBlocked, turnLeft

coinCounter = 0

for i in range(9):
  moveForward()
  if isCoin:
    collectCoin()
    coinCounter += 1
  if isBlocked:
    turnLeft()
```





# 数据类型

```python
from world import Block, make

block = Block('road')
make(block, x, z)

# 列表 字典 元组 集合
list1 = [1, 3, 5, 7, 100] # 列表

# 字典
items = {
  'type': 'road', # road bridge floor
  'position': [2, 2],
  'coin': True
}

```



```python
block = Block('road')
make(block, x, z)

coin = Coin()
make(coin, x, z)
```



1. 字符串类型

2. 布尔类型

3. 列表

4. 字典







## 1. 构造世界

#### 放置砖块

#### 砖块的类型

#### 放置金币与角色

#### 构建一个属于自己的场景

#### 堆叠砖块

#### 放置装饰砖块

#### 字符串

#### 字符串切片



## 2. 字典

#### 使用字典存储砖块信息

#### 存储砖块位置

#### 使用布尔类型添加金币



## 3. 列表

#### 列表是什么

#### 列表的每一项

#### 列表的下标

#### 使用for循环遍历列表

