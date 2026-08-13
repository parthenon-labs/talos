// todo: 需要收集更多的错误示例来完善方法
export function getInfoFromSyntaxError(err: Error) {
  // 错误类型的提示, 如: SyntaxError: invalid syntax
  let errorTypeMessage = '';
  // 错误的行, 如: File "<exec>", line 1。从 0 开始
  let row = -1;
  // 错误提示箭头所在列。从 0 开始
  let col = -1;
  try {
    const lines = err.message.split('\n');
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      const str = lines[i];
      if (!str || !str.trim()) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (str.toLowerCase().includes('error') && !errorTypeMessage) {
        const chnMap = {
          SyntaxError: '语法错误',
          IndentationError: '缩进错误',
        };
        const type = str.split(':')[0] as keyof typeof chnMap;
        errorTypeMessage = chnMap[type] || str;
        // eslint-disable-next-line no-continue
        continue;
      }
      if (str.includes('^') && col === -1) {
        // 错误信息自带格式中，该行自带前缀空格，目前(2021-12-20)看到都是 4 格
        // 减去 1 是因为要从 0 开始
        col = str.length - 1 - 4;
        // eslint-disable-next-line no-continue
        continue;
      }
      const matched = str.match(/line\s*(\d)/);
      if (matched && row === -1) {
        // 减去 1 是因为要从 0 开始
        row = Number(matched[1]) - 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      if (errorTypeMessage && row !== -1 && col !== -1) {
        // 已经获取到所有需要的信息，提前结束
        return { errorTypeMessage, row, col };
      }
    }
  } catch {
    // todo something ...
  }
  return { errorTypeMessage, row, col };
}

export function transformPyodideRunError(err: Error) {
  const errorList = err.message.split('\n').filter(Boolean);
  const errorMessage = errorList[errorList.length - 1];
  try {
    const { row } = getInfoFromSyntaxError(err);
    const rowMsg = row > -1 ? `第 ${row + 1} 行, ` : '';

    if (errorMessage.includes('EOFError')) {
      return `EOFError: 输入被中断`;
    }

    if (errorMessage.includes('ZeroDivisionError')) {
      return `ZeroDivisionError: ${rowMsg}0 不能作为被除数`;
    }

    if (errorMessage.includes('ValueError')) {
      const matched = errorMessage.match(/\s(\w*)\(\)/);
      const fnName = matched ? `'${matched[1]}'` : '';
      return `ValueError: ${rowMsg}函数 ${fnName} 参数类型错误`;
    }

    if (errorMessage.includes('TypeError')) {
      return `TypeError: ${rowMsg}类型错误`;
    }

    if (errorMessage.includes('StopIteration')) {
      return `StopIteration: next 超出迭代项`;
    }

    if (errorMessage.includes('ImportError')) {
      const matched = errorMessage.match(/cannot import name ['"](\w*)['"]/);
      const importName = matched ? `'${matched[1]}'` : '';
      return `ImportError: ${importName} 引入错误`;
    }

    if (errorMessage.includes('NameError')) {
      const matched = errorMessage.match(/name ['"](\w*)['"] is not defined/);
      const tip = matched ? matched[1] : '';
      return `NameError: 变量 '${tip}' 未定义`;
    }

    if (errorMessage.includes('IndexError')) {
      return `IndexError: ${rowMsg}下标超出范围`;
    }

    if (errorMessage.includes('ModuleNotFoundError')) {
      const matched = errorMessage.match(/No module named (['"]\w*['"])/);
      const tip = matched ? matched[1] : '';
      return `ModuleNotFoundError: 模块 ${tip} 未找到`;
    }

    if (errorMessage.includes('KeyError')) {
      const tip = errorMessage.split(':')[1].trim();
      return `KeyError: ${rowMsg}属性 ${tip} 未找到`;
    }
  } catch {
    // todo something ...
  }

  return errorMessage;
}
