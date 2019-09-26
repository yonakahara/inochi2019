export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
export TMPDIR="$HOME/tmp"
export PYTHON_PATH=./
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
