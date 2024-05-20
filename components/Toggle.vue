<script setup lang="ts">
const theme = ref("light");
onMounted(() => {
  const localTheme = localStorage.getItem("theme") ?? "light";
  document.documentElement.setAttribute("data-theme", localTheme);
  theme.value = localTheme;
});

const isChecked = computed(() => {
  return theme.value === "light";
});

const toggleTheme = () => {
  theme.value = theme.value == "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme.value);
  localStorage.setItem("theme", theme.value);
};
</script>

<template>
  <input
    id="toggle_checkbox"
    type="checkbox"
    :checked="isChecked"
    @click="toggleTheme"
  />
  <label for="toggle_checkbox">
    <IconsSun id="star" />
    <IconsMoon id="moon" />
  </label>
</template>

<style scoped lang="scss">
#toggle_checkbox {
  display: none;
  &:not(:checked) + label {
    background-color: #009fd1;
  }

  &:checked + label {
    background-color: $text;
    #star {
      top: -52px;
    }

    #moon {
      bottom: 13px;
      @include for-phone-only {
        bottom: 7px;
      }
      &:before {
        background-color: $text;
      }
    }
  }
}

label {
  display: block;
  position: fixed;
  bottom: 0;
  right: 2rem;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 5;
  cursor: pointer;
  transition: 0.3s ease background-color;
  overflow: hidden;
  @include for-phone-only {
    width: 46px;
    height: 46px;
  }
}

#star {
  position: absolute;
  top: 13px;
  left: 13px;
  width: 30px;
  height: 30px;
  color: $underlined;
  transform: scale(1);
  border-radius: 50%;
  transition:
    0.3s ease top,
    0.3s ease left,
    0.3s ease transform,
    0.3s ease background-color;
  z-index: 1;
  @include for-phone-only {
    top: 9px;
    left: 8px;
  }
}

#moon {
  position: absolute;
  bottom: -52px;
  left: 15px;
  width: 30px;
  height: 30px;
  fill: $background;
  border-radius: 50%;
  transition: 0.3s ease bottom;
  @include for-phone-only {
    left: 9px;
  }
  &:before {
    content: "";
    position: absolute;
    top: -12px;
    left: -17px;
    width: 40px;
    height: 40px;
    background-color: $ext-btn-bg;
    border-radius: 50%;
    transition: 0.3s ease background-color;
  }
}
</style>
